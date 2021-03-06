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

function tweets() {
    var Twitter = require("twitter");
    var client = new Twitter(keys.twitter);
    var screenName = { screen_name: "" };
    client.get('statuses/user_timeline', screenName, function (error, tweets) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("@: " + tweets[i].text + " " + tweets[i].created_at.substring(0, 19));
                
            }
        } else {
            console.log(er);
        }
    });
}
function spotify() {
    
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify)
    search = search || "The Sign by Ace of Base";
    
    spotify.search({ type: 'track', query: search, limit: 5}, function (err, data) {
        
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            
            console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Album name: " + data.tracks.items[i].album.name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);
        }
    });
  }
  switch (keyword) {
    case "my-tweets":
    tweets();
    break;

    case "spotify-this-song":
      spotify();
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
    case "movie-this":
      omdb();
      break;
    
  }  

  
function doWhatItSays() {
    
    var fs = require("fs");
   
    fs.readFile("./random.txt", "utf8", function (error, data) {
        
        if (error) {
            return console.log(error);
        }
       
        var dataArr = data.split(",");

        keyword = dataArr[0];
        search = dataArr[1];
        spotify();

    });
    
}

  
function omdb() {
    //require request package
    var request = require("request")
    //allow for user not entering search parameter
    search = search || "Mr. Nobody"
    //store URL for api including search parameter
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    //ombd api call
    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            //log relevant data, with divisions
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated);
            //console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + " Fresh");
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Starring: " + JSON.parse(body).Actors);
            console.log("-----------------------------");

        }
        //end of api call
    })
    //end of ombd function
}
  
 