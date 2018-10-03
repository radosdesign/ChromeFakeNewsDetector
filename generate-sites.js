'use strict';

const fetch = require('node-fetch');
const fs = require('fs');

const konspiratory_url = 'https://www.konspiratori.sk/assets/downloads/zoznam.txt';

// Fetch the list of domains and create 'extension/sites.js' file
fetch(konspiratory_url)
    .then(res => res.text())
    .then(body => {
            let lines = body.split(/\r?\n/);
            let linesCount = lines.length;

            let stream = fs.createWriteStream("extension/sites.js");
            stream.write('var sites = [\n');
            for (var i = 0; i < linesCount; i++) {
                let line = lines[i];
                stream.write('  "' + line + '"');
                if (i < linesCount - 1) {
                    stream.write(',');
                }
                stream.write('\n');
            }
            stream.write('];\n');
            stream.end();
        }
    );

