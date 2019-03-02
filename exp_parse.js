const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://dolores-hidalgo.com/lugares-tipo/entretenimiento/';
const url2 = 'http://dolores-hidalgo.com/lugares-tipo/atractivos/';

/*entretenimiento parsing*/
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

/*atractivo parsing*/
const Parser2 = (url2) => {
    return rp(url2)
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

module.exports = Parser2;
