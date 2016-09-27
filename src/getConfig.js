var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

var configPath = path.resolve(__dirname, '../config.yml');

exports.getRepo = function(name) {
    var repo = false;
    
    if (name.indexOf('/') > -1) return name;

    try {
        var contents = fs.readFileSync(configPath, 'utf8');
        var data = yaml.safeLoad(contents).templates;
    } catch (err) {
        console.log(err.stack || String(err));
    }

    Object.keys(data).forEach(function(t) {
        if (name === t) {
            repo = data[t];
        }
    });

    return repo;
};

exports.getMsg = function() {
    try {
        var contents = fs.readFileSync(configPath, 'utf8');
        var data = yaml.safeLoad(contents).completeMsg;
    } catch (err) {
        console.log(err.stack || String(err));
    }

    return data;
};