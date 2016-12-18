#!/usr/bin/env node
"use strict";
const meow = require('meow');
const cli = meow(`
    Usage
      $ get-items.js --from 2016-01-01 --to 2017-01-01

    Options
      --from from date (parsable new Date)
      --to   to date (parsable new Date)
`);
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */

const moment = require("moment");
const JSerStat = require("jser-stat").JSerStat;
const request = require("request");
const cachedRequest = require('cached-request')(request);
function getURLAsync(URL) {
    return new Promise(function(resolve, reject) {
        //
        cachedRequest({
            url: URL,
            ttl: 360 * 1000
        }, function(error, response, body) {
            if (error) {
                return reject(error);
            }
            if (response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                reject('error: ' + response.statusCode);
            }
        })
    });
}
const posts = getURLAsync("https://jser.info/posts.json");
const items = getURLAsync("https://jser.info/source-data/items.json");
Promise.all([posts, items]).then(function(results) {
    const postData = results[0];
    const itemData = results[1];
    const stat = new JSerStat(itemData, postData.reverse());
    if (cli.flags.from && cli.flags.to) {
        const fromDate = moment(cli.flags.from).toDate();
        const toDate = moment(cli.flags.to).toDate();
        return stat.findItemsBetween(fromDate, toDate);
    } else {
        return stat.items;
    }
}).then((items) => {
    console.log(JSON.stringify(items, null, 4));
}).catch(function(error) {
    console.error(error.stack)
});