'use strict';

var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var uid = require('uid');

var configPath = path.resolve(__dirname, '../config.yml');
var configFile = fs.readFileSync(configPath, 'utf8');

exports.getRepo = function(name) {
    if (name.indexOf('/') > -1) return name;

    var repo = '';
    var data = yaml.safeLoad(configFile).templates;

    Object.keys(data).forEach(function(t) {
        if (name === t) {
            repo = data[t];
        }
    });

    return repo;
};

exports.getMsg = function(type) {
    var msg = '';
    var data = yaml.safeLoad(configFile).message;
 
    Object.keys(data).forEach(function(t) {
        if (type === t) {
            msg = data[t];
        }
    });

    return msg;
};

exports.getQuestion = function() {
    return yaml.safeLoad(configFile).question;
};

exports.getPath = function(type) {
    var path = '';
    var data = yaml.safeLoad(configFile).path;

    Object.keys(data).forEach(function(t) {
        if (type === t) {
            path = data[t] + uid();
        }
    });

    return path;
};