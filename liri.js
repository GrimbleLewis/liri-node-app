// :How to use Liri:
// Liri has 4 functions that perform different actions based on the arguments you provide
// Here are the commands needed to run each one of them
// -------------------------------------------------------------------------------------------------------------------------------------
// node liri.js concert-this <artist name>
// node liri.js spotify-this-song <song name>
// node liri.js movie-this <movie name>
// node liri.js do-what-it-says
// do-what-it-says command runs a function that reads the file random.txt and runs the appropriate function based on the text provided
// -------------------------------------------------------------------------------------------------------------------------------------

// all of the required programs needed to run this app
require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function concertThis(artist) {
  // if running do-what-it-says, artist should not be in quotations in random.txt file
  if (process.argv[2] === "do-what-it-says") {
    artist;
  } else {
    artist = process.argv.slice(3).join(" ");
  }
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(function(response) {
    if (response.data[0] === undefined) {
      console.log(
        "\nI'm sorry, it doesn't look like there are any upcoming events for " +
          titleCase(artist)
      );
    } else {
      console.log(
        "\nHere are the next 10 upcoming shows for " +
          titleCase(artist) +
          "\n\n"
      );
      for (var i = 0; i < 10; i++) {
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log(
          "Venue Location: " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.region
        );
        console.log(
          "Event Date: " +
            moment(response.data[i].datetime).format("MM/DD/YYYY") +
            "\n"
        );
      }
      console.log("We hope to see you at a future event!");
    }
  });
}

function spotifyThisSong(song) {
  if (process.argv[2] !== "do-what-it-says" && process.argv[3] === undefined) {
    song = "The Sign";
  } else if (process.argv[2] === "do-what-it-says") {
    song;
  } else {
    song = process.argv.slice(3).join(" ");
  }
  console.log("\nHere is what Liri found for you");
  spotify
    .search({ type: "track", query: song })
    .then(function(response) {
      console.log(
        "\nArtist Name: " +
          titleCase(response.tracks.items[0].album.artists[0].name)
      );
      console.log("Song Name: " + titleCase(song));
      console.log("Album Name: " + response.tracks.items[0].album.name);
      console.log(
        "Song Preview: " + response.tracks.items[0].external_urls.spotify
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(movie) {
  if (process.argv[2] !== "do-what-it-says" && process.argv[3] === undefined) {
    movie = "Mr. Nobody";
  } else if (process.argv[2] === "do-what-it-says") {
    movie;
  } else {
    movie = process.argv.slice(3).join("+");
  }

  var queryUrl =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(function(response) {
    console.log("\nMovie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    if (JSON.stringify(response.data.Ratings[1].Value, null, 2) === undefined) {
      console.log("Metacritic Score: " + response.data.Metascore);
    } else {
      console.log(
        "Rotten Tomatoes Rating: " +
          JSON.stringify(response.data.Ratings[1].Value, null, 2)
      );
    }
    console.log("Location(s) Filmed: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
}

// reads the random.txt file and and runs what is provided in that file
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data);

    var dataArr = data.split(",");

    console.log(dataArr);

    if (dataArr.length == 2) {
      runFunction(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      runFunction(dataArr[0]);
    }
  });
}

// takes input from run and runs the appropriate function
function runFunction(input, functionData) {
  if (input === "concert-this") {
    concertThis(functionData);
  } else if (input === "spotify-this-song") {
    spotifyThisSong(functionData);
  } else if (input === "movie-this") {
    movieThis(functionData);
  } else if (input === "do-what-it-says") {
    doWhatItSays();
  }
}

// looks at argv[2] and argv[3] which gets pushed into runFunction that chooses  which
// function to run based on the input
function run(argOne, argTwo) {
  runFunction(argOne, argTwo);
}

run(process.argv[2], process.argv[3]);

// capitalized first letter so make some of the returned info more presentable
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
