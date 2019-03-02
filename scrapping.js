const rp = require('request-promise');
const $ = require('cheerio');
const parserito = require('./parsing');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then((html) => {
        const wikiUrls = [];
        for(let i = 0; i < 45; i++){
            wikiUrls.push($('big > a', html)[i].attribs.href);
        }
        return Promise.all(
            wikiUrls.map((url) => {
                return parserito('https://en.wikipedia.org' + url);
            })
        )
    })

    .then((presidents) => {
        console.log(presidents);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })
