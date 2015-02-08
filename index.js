#!/usr/bin/env node

var request = require('request');
var parseArgs = require('minimist');

var args = parseArgs(process.argv);
var username = args._[2];

var followers_options = {
    url: 'https://api.github.com/users/' + username + '/followers',
    headers: {
        'User-Agent': 'request'
    }
};

var data = {};

request(followers_options, function (error, response, body) {
    if (error) return console.log(error, "Couldn't find page!");
    if (!error && response.statusCode == 200) {
        data.html = body;
        return console.log(JSON.stringify(body));
    }
    if (!error) return console.log(error, "something went wrong, status code: " + response.statusCode + " , tried " + followers_url);
});


console.log("output");
