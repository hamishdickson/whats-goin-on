#!/usr/bin/env node

var request = require('request');
var parseArgs = require('minimist');

var args = parseArgs(process.argv);
var username = args._[2];

var HEADERS = {
        'User-Agent': 'request'
};


var followers_options = {
    url: 'https://api.github.com/users/' + username + '/followers',
    headers: HEADERS
};

var starred_options = {
    url: 'https://api.github.com/users/' + username + '/starred',
    headers: HEADERS
};

var data = {};

getFollowersData();

function getFollowersData() {
    request(followers_options, function (error, response, body) {
        if (error) return console.log(error, "Couldn't find page!");
        if (!error && response.statusCode == 200) {
            return console.log(getFollowers(body));
        }
        if (!error) return console.log(error, 
                                       "Oh no! Something went wrong, status code: " 
                                       + response.statusCode + " , tried " + followers_url);
    });
}

function getFollowers(inData) {
    var jsonData = JSON.parse(inData);
    var outData = {};

    for (var i = 0; i < jsonData.length; i++) {
        outData[i] = jsonData[i].login;
    }
    
    return outData;
}
