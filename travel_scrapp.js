//HOTELES DOLORES: http://dolores-hidalgo.com/lugares-categoria/hoteles/
//HOTEL PARTICULAR: http://dolores-hidalgo.com/lugares/hotel-maria-isabella/

const rp = require('request-promise');
const $ = require('cheerio');
const parserito = require('./travel_parse');
const url = 'http://dolores-hidalgo.com/lugares-categoria/hoteles/';

rp(url)
    .then((html) => {
        const hotelCollection = [];
        for(let i = 0; i < 1; i++){
            hotelCollection.push($('h4 > a', html)[i].attribs.href);
        }
        return Promise.all(
            hotelCollection.map((url) => {
                return parserito(url);
            })
        )
    })

    .then((hotels) => {
        console.log(hotels);
    })
    .catch((err) => {
        console.log(`Here's an error!`);
    })