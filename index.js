#!/usr/bin/env node

var request = require('request');
var parseArgs = require('minimist');

var args = parseArgs(process.argv);
var username = args._[2];

var HEADERS = {
        'User-Agent': 'request'
};

var events_options = {
    url: 'https://api.github.com/users/' + username + '/received_events',
    headers: HEADERS
};

var data = {};

getEventsData();

function getEventsData() {
    request(events_options, function (error, response, body) {
        if (error) return console.log(error, "Couldn't find page!");
        if (!error && response.statusCode == 200) {
            return console.log(getEvents(body));
        }
        if (!error) return console.log(error, 
                                       "Oh no! Something went wrong, status code: " 
                                       + response.statusCode + " , tried " + followers_url);
    });
}

function getEvents(inData) {
    var jsonData = JSON.parse(inData);
    var outData = {};

    for (var i = 0; i < jsonData.length; i++) {
        outData[i] = {
            "login": jsonData[i].actor.login,
            "event": jsonData[i].type.replace('Event', ''),
            "repo": jsonData[i].repo.name
        };
    }
    
    return outData;
}
