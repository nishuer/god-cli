#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');
var ora = require('ora');
var chalk = require('chalk');
var inquirer = require('inquirer');
var download = require('download-git-repo');

var _config = require('../src/getConfig');
var generate = require('../src/generate');

require('../src/style');

var Handlebars = require('handlebars');
/**
 * CLI configure
 */

program
    .usage('<template-name> [project-name]');

program.on('--help', function() {
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
 * Settings
 */

var template = program.args[0];
var project = program.args[1];
var to = path.resolve(project || '.');
var hasPlace = !project || project === '.';

if (fs.existsSync(to)) {
    inquirer.prompt([{
        type: 'confirm',
        name: 'yes',
        message: hasPlace ? 'Generate project in current directory?' : 'Target directory exists. Continue?'
    }]).then(function(answers) {
        if (answers.yes) {
            console.log();
            action();
        }
    });
} else {
    action();
}

function action() {
    var tplRepo = _config.getRepo(template);
    var spinner = ora('downloading template...');
    spinner.start();
    download(tplRepo, to, function(err) {
        if (err) return console.log(err);

        spinner.text = 'download complete!';
        spinner.succeed();

        generate(hasPlace, project);
    });
}