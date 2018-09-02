const express = require('express');
const util = require('util');
const scrap = require('./scrap');
const fs = require('fs');

const app = express()

const readFile = util.promisify(fs.readFile);
async function readFileAsync(){
    const result = await readFile('products.json');
    return result;
}

app.get('/', (req, res) => {
    scrap().then(()=>{
        readFileAsync().then((result)=>{
          var obj = JSON.parse(result);
          res.send(obj);
        })
        .catch((error)=>{
            throw error;
        });
    }).catch((error)=>{
        throw error;
    });
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))