'use strict'

const pug = require('pug');
const fs = require('fs');

const compileIndex = pug.compileFile('src/layouts/index.pug');
const dataIndex = 'src/data/index.json';

fs.readFile(dataIndex, 'utf8', (err, data) => {
    if(err) throw err;
    data = JSON.parse(data);
    let model = {
        "model": data
    }
    runCompile(compileIndex, model);
});


function runCompile(file, data) {
    fs.writeFile('public/index.html', file(data), (err) => {
        if(err) throw err;
        console.log('Index.html is written');
    });

}