'use strict';

var path = require('path');
var util = require('util');
var chalk = require('chalk');
var Handlebars = require('handlebars');
var each = require('async/each');
var Metalsmith = require('metalsmith');

var ask = require('../lib/ask');
var _config = require('../lib/getConfig');

Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b ?
        opts.fn(this) :
        opts.inverse(this);
})

Handlebars.registerHelper('if_or', function (a, b, c, opts) {
    return (a === c || b) ?
        opts.fn(this) :
        opts.inverse(this);
})

module.exports = function (src, dest, project, callback) {
    var metalsmith = Metalsmith(path.join(src, 'template'));

    var data = Object.assign(metalsmith.metadata(), {
        dirName: project,
        isIn: dest === process.cwd()
    });

    metalsmith
        .use(askQuestion)
        .use(renderTemplate)
        .clean(false)
        .source('.')
        .destination(dest)
        .build(function (err) {
            if (err) throw err;
            callback(data);
        });
};

function askQuestion(files, metalsmith, done) {
    ask(_config.getQuestion(), metalsmith.metadata(), done);
}

function renderTemplate(files, metalsmith, done) {
    var keys = Object.keys(files);
    var metadata = metalsmith.metadata();

    each(keys, function (file, done) {
        var str = files[file].contents.toString();
        var template = Handlebars.compile(str);
        files[file].contents = new Buffer(template(metadata));
        done();
    }, done);
}