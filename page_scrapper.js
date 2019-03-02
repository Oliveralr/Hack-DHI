const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
    .launch()
    //PUPPETEER PROMISE
    .then((browser) => {
        return browser.newPage();
    })
    .then((page) => {
        return page.goto(url).then(() => {
            return page.content();
        });
    })
    //BASIC PROMISE HTML-BODY CONTROL
    .then((html) => {
        $('h2',html).each(() => {
            console.log($(this).text());
        })
    })
    .catch((err) => {
        console.log('ERROR!');
    })