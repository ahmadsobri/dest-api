let axios = require('axios'); // HTTP client
let cheerio = require('cheerio'); // HTML parsing package
let jsonframe = require('jsonframe-cheerio'); // a cheerio plugin I designed
let fs = require('fs'); // is included in node.js - you don't need to install it

// url resource
let base = 'https://www.indonesia.travel';
let url = {
    dest:base+'/gb/en/destinations',
};
    
let scrap = {
    destination : async function () {
        let promise = await new Promise((resolve, reject) => {
            axios.get(url.dest)
            .then((response) => {
                if(response.status === 200) {
                    var html = response.data;
                    let $ = cheerio.load(html); // We load the html we received into cheerio's parser
                    jsonframe($);               // We add the plugin to the cheerio's parser

                    fs.writeFileSync('ph.html', html); // This saves the html to a ph.html for checks
                    
                    var data = {       // This is a simple conversation of the data structure
                        "home": { 
                            "slides":{
                                "_s":".indt-container .highlight-destination-five-list",
                                "_d": [{
                                    "title":".highlight-sub-title",
                                    "description":".hightlight-desc",
                                    "image":".lazy @ data-src"
                                }],
                            },
                            "destinations":{
                                "java":{
                                    "_s":".indt-container #1desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                                "maluku-papua":{
                                    "_s":".indt-container #2desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                                "bali-nusa-tenggara":{
                                    "_s":".indt-container #3desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                                "sulawesi":{
                                    "_s":".indt-container #4desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                                "kalimantan":{
                                    "_s":".indt-container #5desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                                "sumatera":{
                                    "_s":".indt-container #6desktop .news-latest-five-list",
                                    "_d": [{
                                        "title":".highlight-sub-title",
                                        "lat-long":".highlightlink @ data-lat-long",
                                        "description":".hightlight-desc",
                                        "image":".lazy @ data-src"
                                    }],
                                },
                            },
                        }
                    };

                    var products = $('html').scrape(data); // Scrape the list of products based on the json frame we defined before
                    fs.writeFileSync("products.json",JSON.stringify(products, null, 2)); // You can see that the output json is structured the way we wanted it thanks to the json frame
                    
                    resolve();
                }
            }).catch(err => {
                throw err
            });
        }).catch(err => {
            throw err
        });
        return promise
    },
    
    detail : async function (param) {
        let uri = url.dest+'/'+param.region+'/'+param.target;
        let promise = await new Promise((resolve, reject) => {
            axios.get(uri)
            .then((response) => {
                if(response.status === 200) {
                    var html = response.data;
                    let $ = cheerio.load(html); // We load the html we received into cheerio's parser
                    jsonframe($);               // We add the plugin to the cheerio's parser

                    fs.writeFileSync('detail.html', html); // This saves the html to a ph.html for checks
                    
                    var results = [];
                    var elm = $('.article-detail-isi')[0].children[1].children[0].data;
                    var result = elm.match(/var textar=(.*);/)[1].replace(/\"/g, '');
                    //console.log(result);
                    var data = {       // This is a simple conversation of the data structure
                        "detail": {
                            "content":{
                                "_s":".indt-container .article .article-text-body",
                                "_d": {
                                    "title":".h1-article-title",
                                },
                            },
                            "slides":{
                                "_s":".slideshow-image div",
                                "_d": [{
                                    "image":"img @ src",
                                }],
                            },
                        },
                    };
                    
                    var products = $('html').scrape(data); // Scrape the list of products based on the json frame we defined before
                    
                    products.detail.content.description = result;
                    fs.writeFileSync("details.json",JSON.stringify(products, null, 2)); // You can see that the output json is structured the way we wanted it thanks to the json frame
                    
                    resolve();
                }
            }).catch(err => {
                throw err
            });
        }).catch(err => {
            throw err
        });
        return promise
    },
}

module.exports = scrap;