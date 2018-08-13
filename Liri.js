require("dotenv").config();

var keys = require("./keys");

var keyword = process.argv[2];
var wholeArgv = process.argv;
var search = "";

for (var i = 3; i < wholeArgv.length; i++) {
    if (i > 3 && i < wholeArgv.length) {
        search = search + "+" + wholeArgv[i];
    }
    else {
        search += wholeArgv[i];
    }
}

function runTweets() {
    var Twitter = require("twitter");
    var client = new Twitter(keys.twitter);
    var screenName = { screen_name: "" };
    client.get('statuses/user_timeline', screenName, function (error, tweets) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("@: " + tweets[i].text + " Created on: " + tweets[i].created_at.substring(0, 19));
                console.log("--")
            }
        } else {
            console.log(er);
        }
    });
}
function runSpotify() {
    
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify)
    search = search || "The Sign by Ace of Base";
    
    spotify.search({ type: 'track', query: search, limit: 5}, function (err, data) {
        
        if (err) {
            return console.log('Error occurred: ' + err);
        }