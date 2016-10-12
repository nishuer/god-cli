'use strict';

var inquirer = require('inquirer');
var eachSeries = require('async/eachSeries');

var getUser = require('../lib/getUser');

module.exports = function (question, data, done) {
    eachSeries(Object.keys(question), function (key, done) {
        run(question, data, key, done);
    }, done);
};

function run(question, data, key, done) {
    var prompt = question[key];

    if (key === 'author') {
        prompt.default = getUser();
    }
    if (key === 'name') {
        prompt.default = data.dirName;
    }
    if (key === 'preset' && !data['lint']) {
        return done();
    }

    inquirer.prompt([{
        type: prompt.type,
        name: key,
        default: prompt.default,
        choices: prompt.choices || [],
        message: prompt.message
    }]).then(function (answers) {
        data[key] = answers[key]
        done();
    });
}