#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

require('../src/style');

var configPath = path.resolve(__dirname, '../config.yml');

try {
    var contents = fs.readFileSync(configPath, 'utf8');
    var data = yaml.safeLoad(contents).templates;
} catch (err) {
    console.log(err.stack || String(err));
}

console.log('  Official Templates:');
console.log();

Object.keys(data).forEach(function (name) {
    console.log('  ' + name);
});