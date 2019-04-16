require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];


if (command === "concert-this") {
    concertThis();
} else if (command === "spotify-this-song") {
    spotifyThisSong();
} else if (command === "movie-this") {
    movieThis();
} else if (command === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log('Please enter a valid command');
}


function concertThis (artist) {
    var artist = process.argv.slice(3).join(" ");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function(response) {
            console.log("\nHere are the next 10 upcoming shows for " + artist + "\n\n");
            for (var i = 0; i < 10; i++){
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n");
            }
            console.log("We hope to see you at a future event!");
        });
};

function spotifyThisSong (song) {
    var song = process.argv.slice(3).join(" ");
   
    spotify.search({ type: 'track', query: song }).then(
        function(response) {
            console.log("\nArtist Name: " + titleCase(response.tracks.items[0].album.artists[0].name));
            console.log("Song Name: " + titleCase(song));
            console.log("Album Name: " + response.tracks.items[0].album.name)
            console.log("Song Preview: " + response.tracks.items[0].external_urls.spotify)
        })
        .catch(function(err) {
            console.log(err);
        });
    
};

function movieThis (movie) {
    if (process.argv[3] === undefined){
        movie = "Mr. Nobody"
    } else {
    var movie = process.argv.slice(3).join('+')
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            // console.log(JSON.stringify(response.data.Ratings[1].Value, null, 2));
          console.log("\nMovie Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          if (JSON.stringify(response.data.Ratings[1].Value, null, 2) === undefined) {
            console.log("Metacritic Score: " + response.data.Metascore);
          } else {
          console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value, null, 2));
          }
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        }
      );
};


function doWhatItSays () {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
          }

          console.log(data);
          
          var dataArr = data.split(',')

          console.log(dataArr);

  
        });
};




var titleCase = function(str) {
    var result = [];
  
    var words = str.split(" ");
  
    for (var i = 0; i < words.length; i++) {
      var word = words[i].split("");
  
      word[0] = word[0].toUpperCase();
  
      result.push(word.join(""));
    }
  
    return result.join(" ");
  };

