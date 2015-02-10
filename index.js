#!/usr/bin/env node

var request = require('request');
var parseArgs = require('minimist');
var moment = require('moment');

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

getEventsDataAndOutputToConsole();

function getEventsDataAndOutputToConsole() {
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
        outString = outString + "\n" 
            + getSymbol(ugly.data[j].event)
            + "\t" + beerGoggles(ugly.data[j].time) 
            + "\t" + ugly.data[j].login 
            + makeGoodEnglish(ugly.data[j].event)
            + ugly.data[j].repo + "\n";
    }

    return outString;
}

function getSymbol(event) {
    if (event == 'Watch') return '⊙';
    if (event == 'Push') return '=>';
    if (event == 'Create') return '+';
    if (event == 'Fork') return '-<';
    return '-';
}

function makeGoodEnglish(event) {
    if (event == 'Watch') return ' is now watching ';
    if (event == 'Push') return ' pushed to repo ';
    if (event == 'Create') return ' created new repo ';
    if (event == 'Fork') return ' forked ';
    return ' did a ' + event;
}

function beerGoggles(uglyDate) {
    var prettyDate = moment(uglyDate, "YYYY[-]MM[-]DD[T]h[:]mm[:]ss[Z]").fromNow();
    return prettyDate;
}
