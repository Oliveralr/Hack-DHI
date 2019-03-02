//ENTRETENIMIENTOS DOLORES: http://dolores-hidalgo.com/lugares-tipo/entretenimiento/
//ENTRETENIMIENTO PARTICULAR: http://dolores-hidalgo.com/lugares/la-farra-bar-snacks/
//ATRACTIVOS DOLORES: http://dolores-hidalgo.com/lugares-tipo/atractivos/
//ATRACTIVO PARTICULAR: http://dolores-hidalgo.com/lugares/cuna-de-tierra/

const rp = require('request-promise');
const $ = require('cheerio');
const parserito = require('./exp_parse');
const url = 'http://dolores-hidalgo.com/lugares-tipo/entretenimiento/';
const parserito2 = require('./exp_parse');
const url2 = 'http://dolores-hidalgo.com/lugares-tipo/atractivos/';

/*entretenimiento scraping*/
rp(url)
    .then((html) => {
        const entCollection = [];
        for(let i = 0; i < 1; i++){
            entCollection.push($('h4 > a', html)[i].attribs.href);
        }
        return Promise.all(
            entCollection.map((url) => {
                return parserito(url);
            })
        )
    })

    .then((entretenimiento) => {
        console.log(entretenimiento);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })

/*atractivo scraping*/
rp(url2)
    .then((html) => {
        const atrCollection = [];
        for(let i = 0; i < 1; i++){
            atrCollection.push($('h4 > a', html)[i].attribs.href);
        }
        return Promise.all(
            atrCollection.map((url2) => {
                return parserito(url2);
            })
        )
    })

    .then((atractivos) => {
        console.log(atractivos);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })
