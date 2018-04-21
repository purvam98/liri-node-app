require("dotenv").config();
//Grab data from keys.js
var keyfile = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keyfile.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keyfile.spotify);
var request = require('request');
var fs = require('fs');
//Stored argument's array
var allarg = process.argv;
//movie or song
var final = "";
//attaches multiple word arguments
for (var m = 3; m < allarg.length; m++) {
    if (m > 3 && m < allarg.length) {
        final = final + "+" + allarg[m];
    } else {
        final = final + allarg[m];
    }
}
var arg = process.argv[2];
//if-else statement
if (arg === "my-tweets") {
    //Display last 20 Tweets
    var params = { screen_name: '@ChokshiPurvam' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("-------");
            }
        }
    });

}
else if (arg === "spotify-this-song") {
    if (process.argv[3]) {
        spotify.search({ type: 'track', query: final }, function (err, data) {
            if (!err) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    //artist
                    console.log("Artist: " + songData.artists[0].name);
                    //song name
                    console.log("Song: " + songData.name);
                    //spotify preview link
                    console.log("Preview URL: " + songData.preview_url);
                    //album name
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");


                }
            }
        });
    }
    else {
        spotify.search({ type: 'track', query: "The+Sign" }, function (err, data) {
            if (!err) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    //artist
                    if (songData.artists[0].name === "Ace of Base" && songData.name === "The Sign") {
                        console.log("Artist: " + songData.artists[0].name);
                        //song name
                        console.log("Song: " + songData.name);
                        //spotify preview link
                        console.log("Preview URL: " + songData.preview_url);
                        //album name
                        console.log("Album: " + songData.album.name);
                        console.log("-----------------------");
                    }
                    else {
                        console.log("We didn't found that album");
                    }
                }
            }
        });
    }
}
else if (arg === "movie-this") {

    if (process.argv[3]) {

        var omdbURL = "http://www.omdbapi.com/?t=" + final + "&y=&plot=short&apikey=trilogy";

        request(omdbURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);

                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
                console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            }
        });
    }
    else {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }

}
else if (arg === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function (error, data) {

        var text = data.split(',');
        spotify.search({ type: 'track', query: text[1] }, function (err, data) {
            if (!err) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    //artist
                    console.log("Artist: " + songData.artists[0].name);
                    //song name
                    console.log("Song: " + songData.name);
                    //spotify preview link
                    console.log("Preview URL: " + songData.preview_url);
                    //album name
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");


                }
            }
        });
    });
}
else {
    console.log("Something Went Wrong ! Please try again with new command");
}
