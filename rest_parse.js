const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://dolores-hidalgo.com/lugares-categoria/restaurantes/';

const Parser = (url) => {
    return rp(url)
        .then((html) => {
            return {
                title: $('.eltd-listing-title',html).text(),
                location: $('.eltd-city',html).text()
            }
        })
        .catch((err) => {
            console.log('ERROR!');
        })
}

module.exports = Parser;
