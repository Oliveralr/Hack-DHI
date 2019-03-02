//ARTESANIAS DOLORES: http://dolores-hidalgo.com/lugares-categoria/artesanias/
//ARTESANIA PARTICULAR: http://dolores-hidalgo.com/lugares/artilugios/

const rp = require('request-promise');
const $ = require('cheerio');
const parserito = require('./art_parse');
const url = 'http://dolores-hidalgo.com/lugares-categoria/artesanias/';

rp(url)
    .then((html) => {
        const artCollection = [];
        for(let i = 0; i < 1; i++){
            artCollection.push($('h4 > a', html)[i].attribs.href);
        }
        return Promise.all(
            artCollection.map((url) => {
                return parserito(url);
            })
        )
    })

    .then((artesanias) => {
        console.log(artesanias);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })
