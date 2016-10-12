'use strict';

var execSync = require('child_process').execSync;

module.exports = function () {
    var name = '',
        email = '';

    try {
        name = execSync('git config --get user.name');
        email = execSync('git config --get user.email');
    } catch (err) {
        console.log(err.stack || String(err))
    }

    name = name && name.toString().trim();
    email = email && (' <' + email.toString().trim() + '>');

    return (name || '') + (email || '');
}