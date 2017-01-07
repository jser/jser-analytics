// MIT © 2016 azu
"use strict";
const getStdin = require('get-stdin');
const kuromojin = require("kuromojin");
const analyze = require("negaposi-analyzer-ja");
const moment = require("moment");
/**
 * 期間中のネガティブ、ポジティブスコアを算出してCSVで返す
 *
 * 日付   スコア
 */
getStdin().then(string => {
    const items = JSON.parse(string);
    const promises = items.map(item => {
        return kuromojin(item.content).then(tokens => {
            return analyze(tokens);
        });
    });
    return Promise.all(promises).then(scores => {
        const r = {};
        scores.forEach((score, index) => {
            const key = moment(items[index].date).format("YYYY-MM-DD");
            if (Array.isArray(r[key])) {
                r[key].push(score);
            } else {
                r[key] = [score];
            }
        });
        Object.keys(r).forEach(date => {
            const scores = r[date];
            const score = scores.reduce((total, score) => total + score, 0) / scores.length;
            console.log(`${date}\t${score * 100}`);
        });
    });
});