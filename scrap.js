let axios = require('axios'); // HTTP client
let cheerio = require('cheerio'); // HTML parsing package
let jsonframe = require('jsonframe-cheerio'); // a cheerio plugin I designed
let fs = require('fs'); // is included in node.js - you don't need to install it

var scrap = async function() {
      axios.get('https://www.indonesia.travel/gb/en/destinations')
        .then((response) => {
            if(response.status === 200) {
                var html = response.data;
                let $ = cheerio.load(html); // We load the html we received into cheerio's parser
                jsonframe($);               // We add the plugin to the cheerio's parser

                fs.writeFileSync('ph.html', html); // This saves the html to a ph.html for checks
                
                var productsFrame = {       // This is a simple conversation of the data structure
                    "products": {             // thanks to jsonframe
                        "_s":".indt-container .highlight-destination-five-list",
                        "_d": [{
                            "title":".highlight-sub-title",
                            "description":".hightlight-desc",
                            "image":".lazy @ data-src"
                        }],
                    }
                };

                var products = $('html').scrape(productsFrame); // Scrape the list of products based on the json frame we defined before
                fs.writeFileSync("products.json",JSON.stringify(products, null, 2)); // You can see that the output json is structured the way we wanted it thanks to the json frame
                
            }

        }).catch((err)=>{        
            throw error;
        });
}

module.exports = scrap;