#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var yaml = require('js-yaml');

require('../lib/style');

var configPath = path.resolve(__dirname, '../config.yml');
var configFile = fs.readFileSync(configPath, 'utf8');

try {
    var data = yaml.safeLoad(configFile).templates;
} catch (err) {
    console.log(err.stack || String(err));
}

console.log('  Official templates:');
console.log();

Object.keys(data).forEach(function (name) {
    console.log(chalk.yellow('  ✦ ') + chalk.yellow(name));
});