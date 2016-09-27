var util = require('util');
var chalk = require('chalk');
var Handlebars = require('handlebars');

var _config = require('../src/getConfig');

module.exports = function(hasPlace, dirName) {
    var completeMsg = _config.getMsg();
    var template = Handlebars.compile(completeMsg);
    var data = {
        hasPlace: hasPlace,
        dirName: dirName
    }

    console.log();
    console.log(chalk.cyan(template(data)));
};