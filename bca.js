let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');
let jsdom = require("jsdom");
const { JSDOM } = jsdom;

let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';
let dest = 'https://www.indonesia.travel/gb/en/destinations/java/serang';
/*axios.get(base_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let kurs = [];
  $('tr', '.text-right').each( (i, elm) => {
    kurs.push( {
      currency: $(elm).children().first().text(),
      erate: {
        sell: $(elm).children().eq(1).first().text(),
        buy: $(elm).children().eq(2).first().text()
      },
      tt: {
        sell: $(elm).children().eq(3).first().text(),
        buy: $(elm).children().eq(4).first().text()
      },
      notes: {
        sell: $(elm).children().eq(5).first().text(),
        buy: $(elm).children().eq(6).first().text()
      }
    });
  });
  return(kurs);
})
.then ( (kurs) => {
  console.log(kurs);
});
*/
axios.get(dest).then( (response) => {
  let $ = cheerio.load(response.data);
  let kurs = [];
  var elm = $('.article-detail-isi')[0].children[1].children[0].data;
  var result = elm.match(/var textar=(.*);/)[1];
  //var data = new JSDOM().window.document.innerHTML = result; //$('.article-detail-isi')[0].children[1].children[0].data;
  //var textar = data.match(/var textar=(.*);/)[1];
  console.log(data);
  return(kurs);
})
.then ( (kurs) => {
  console.log(kurs);
});