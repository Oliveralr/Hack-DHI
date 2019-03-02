//RESTAURANTES DOLORES: http://dolores-hidalgo.com/lugares-categoria/restaurantes/
//RESTAURANTE PARTICULAR: http://dolores-hidalgo.com/lugares/restaurante-el-chiquihuite/

const rp = require('request-promise');
const $ = require('cheerio');
const parserito = require('./rest_parse');
const url = 'http://dolores-hidalgo.com/lugares-categoria/restaurantes/';

rp(url)
    .then((html) => {
        const restCollection = [];
        for(let i = 0; i < 1; i++){
            restCollection.push($('h4 > a', html)[i].attribs.href);
        }
        return Promise.all(
            restCollection.map((url) => {
                return parserito(url);
            })
        )
    })

    .then((restaurants) => {
        console.log(restaurants);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })
