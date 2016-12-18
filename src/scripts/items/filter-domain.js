// MIT © 2016 azu
"use strict";
const getStdin = require('get-stdin');
const url = require("url");
getStdin().then(string => {
    const items = JSON.parse(string);
    const hosts = items.map(item => {
        const urlObject = url.parse(item.url);
        return urlObject.host;
    });
    console.log(hosts.join("\n"));
});