const express = require('express');
const util = require('util');
const scrap = require('./scrap');
const fs = require('fs');

const app = express()

const readFile = util.promisify(fs.readFile);
async function readFileAsync(file){
    const result = await readFile(file);
    return result;
}

app.get('/', (req, res) => {
    scrap.destination().then(()=>{
        readFileAsync('products.json').then((result)=>{
          var obj = JSON.parse(result);
          res.send(obj);
        }).catch((error)=>{
            throw error;
        });
    })
    .catch((error)=>{
        throw error;
    });
})

app.get('/destinations/:region/:target', (req, res) => {
    //res.send(req.params);
    scrap.detail(req.params).then(()=>{
        readFileAsync('details.json').then((result)=>{
          var obj = JSON.parse(result);
          res.send(obj);
        }).catch((error)=>{
            throw error;
        });
    })
    .catch((error)=>{
        throw error;
    });
})

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))