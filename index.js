#!/usr/bin/env node

var request = require('request');
var parseArgs = require('minimist');

var args = parseArgs(process.argv);
var username = args._[2];
var numberOfRecords = 10;

var arg3 = args.n;

if (arg3 != undefined) {
    numberOfRecords = arg3;
} else {
    numberOfRecords = 10;
}

var HEADERS = {
        'User-Agent': 'request'
};

var events_options = {
    url: 'https://api.github.com/users/' + username + '/received_events',
    headers: HEADERS
};

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
    var outData = {
        "data": []
    };

    if (jsonData.length < numberOfRecords) numberOfRecords = jsonData.length;

    for (var i = 0; i < numberOfRecords; i++) {
        outData.data[i] = {
            "login": jsonData[i].actor.login,
            "event": jsonData[i].type.replace('Event', ''),
            "repo": jsonData[i].repo.name,
            "time": jsonData[i].created_at
        };
    }
    
    return makeItPretty(outData);
}

function makeItPretty(ugly) {
    var outString = "";

    for (var j = 0; j < ugly.data.length; j++) {
        outString = outString + "---\n" 
            + ugly.data[j].time 
            + "\t" + ugly.data[j].login 
            + " did a " + ugly.data[j].event 
            + " for repo " + ugly.data[j].repo + "\n";
    }

    return outString;
}
