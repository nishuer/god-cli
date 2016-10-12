#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var program = require('commander');
var ora = require('ora');
var chalk = require('chalk');
var rm = require('rimraf').sync;
var inquirer = require('inquirer');
var download = require('download-git-repo');
var Handlebars = require('handlebars');

var _config = require('../lib/getConfig');
var generate = require('../lib/generate');

require('../lib/style');

/**
 * Commander configure
 */

program
    .usage('<template-name> [project-name]');

program.on('--help', function () {
    console.log('  Examples:');
    console.log();
    console.log(chalk.gray('    # create a new project with an official template'));
    console.log('    $ god init webpack my-project');
    console.log();
    console.log(chalk.gray('    # create a new project straight from a github template'));
    console.log('    $ god init username/repo my-project');
    console.log();
});

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

/**
 * Parse the command and execute the relevant operation
 */

var template = program.args[0];
var project = program.args[1];
var toPath = path.resolve(project || '.');
var isIn = !project || project === '.';

if (fs.existsSync(toPath)) {
    inquirer.prompt([{
        type: 'confirm',
        name: 'yes',
        message: isIn ? 'Generate project in current directory?' : 'Target directory exists. Continue?'
    }]).then(function (answers) {
        if (answers.yes) {
            console.log();
            action();
        }
    });
} else {
    action();
}

function action() {
    var tmpPath = _config.getPath('tmp');
    var tplRepo = _config.getRepo(template);

    var spinner = ora('Downloading template for generate project.');
    spinner.start();

    download(tplRepo, tmpPath, function (err) {
        if (err) return console.log(err);
        spinner.stop();

        process.on('exit', function () {
            rm(tmpPath);
        });

        generate(tmpPath, toPath, project, function (data) {
            var template = Handlebars.compile(_config.getMsg('complete'));

            console.log();
            console.log(chalk.yellow(template(data)));
        });
    });
}