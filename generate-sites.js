'use strict';

const fetch = require('node-fetch');
const fs = require('fs');

const domain_list_url = 'https://konspiratori.sk/static/lists/zoznam.txt';
const sites_file = "extension/sites.js";

// Fetch the list of domains and create 'extension/sites.js' file
fetch(domain_list_url)
    .then(res => res.text())
    .then(body => {
            let lines = body.split(/\r?\n/);
            lines = lines.filter(line => line !== '');
            let linesCount = lines.length;

            let stream = fs.createWriteStream(sites_file);
            stream.write('// Last update: ' + new Date() + '\n');
            stream.write('var sites = [');
            lines.forEach((line, index) => {
                // line[0] is the domain name
                // line[1] is the score (rating)
                let domain = line.split(',')[0];
                stream.write('"' + domain + '"');
                if (index < lines.length - 1) {
                    stream.write(',');
                }
            });
            stream.write('];\n');
            stream.end();
        }
    );
