# jser-analytics

JSer.info Analytics

## Install

Install with [npm](https://www.npmjs.com/):

    npm install jser-analytics

## Usage

### filter by domains

    ./bin/get-items.js --from 2015-01-01 --to 2016-01-01 | node ./src/scripts/items/filter-domain.js | distribution --height=10

                  Key|Ct  (Pct)    Histogram
           github.com|277 (26.53%) -------------------------------------------------
            qiita.com| 32  (3.07%) ------
           eslint.org| 26  (2.49%) -----
      speakerdeck.com| 23  (2.20%) ----
           medium.com| 21  (2.01%) ----
     shop.oreilly.com| 18  (1.72%) ----
       blogs.msdn.com| 18  (1.72%) ----
       www.2ality.com| 18  (1.72%) ----
    hacks.mozilla.org| 16  (1.53%) ---
      www.youtube.com| 15  (1.44%) ---

## Changelog

See [Releases page](https://github.com/jser/jser-analytics/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/jser/jser-analytics/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
