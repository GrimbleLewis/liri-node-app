# liri-node-app

Liri is a command line node app that takes user input and returns data based on which command was given.

# :How to use Liri:
Liri has 4 functions that perform different actions based on the arguments you provide
Here are the commands needed to run each one of them
-------------------------------------------------------------------------------------------------------------------------------------
node liri.js concert-this <artist name>
concert-this provides the next 10 shows a artist will play unless there are no upcoming events scheduled on bandsintown

node liri.js spotify-this-song <song name>
spotify-this-song takes in a song and returns the song, artist, album, and spotify link to the song

node liri.js movie-this <movie name>
movie-this takes in a movie and returns an avast amount of information about that movie

node liri.js do-what-it-says
do-what-it-says command runs a function that reads the file random.txt and runs the appropriate function based on the text provided
-------------------------------------------------------------------------------------------------------------------------------------

# Required installs

Make sure you do an `npm install` to create all of the node_modules needed to run the program, they should all download based on the dependencies in the package.json file

You also need to create your own .env file that stores your personal spotify api keys in order for it to return any information, the file should look like this:

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


After that, open up your terminal and Liri is ready to run!


# Sample Usage

Here is a short video showing Liri in action!


https://youtu.be/n26ow1WFl1I