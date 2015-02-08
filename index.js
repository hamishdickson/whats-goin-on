#!/usr/bin/env node

var parseArgs = require('minimist');

var args = parseArgs(process.argv);
var username = args._[2];
var followers_url = 'https://api.github.com/users/' + username + '/followers';

var data = {};

