require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var input = process.argv[2];
var p1 = process.argv[3];

function tweeter() {
  client.get(
    "statuses/user_timeline",
    { screen_name: p1, count: 20 },
    (err, tweets, response) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("====================================================");
        console.log("@" + p1 + "'s last twenty tweets: ");
        for (let i = 0; i < tweets.length; i++) {
          var tweet = tweets[i];
          console.log(tweet.created_at, ": ", tweet.text);
        }
        console.log("====================================================");
      }
    }
  );
}

function spootify() {
  if (p1 === undefined) {
    p1 = "artist:Ace%20of%20Base%20track:The%20Sign";
  }
  spotify.search({ type: "track", query: p1, limit: 1 }, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log("====================================================");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Title: " + data.tracks.items[0].name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("====================================================");
  });
}

function moovie() {
  var movie = p1;
  request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie, function (err, answer, info) {
    var body = JSON.parse(info);
    console.log("====================================================");
    console.log("Title: " + body.Title);
    console.log("Production year: " + body.Year);
    console.log("IMDB rating: " + body.imdbRating);
    console.log("Rotten Tomatoes rating: " + body.Ratings[1].Value);
    console.log("Country of origin: " + body.Country);
    console.log("Language: " + body.Language);
    console.log("Plot: " + body.Plot);
    console.log("Actors: " + body.Actors);
    console.log("====================================================");
  })
}

function wildCard() {
  fs.readFile("./random.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    var inst = data.split(",");
    input = inst[0];
    p1 = inst[1];
    if(inst[0] === "my-tweets") {
      tweeter();
    } else if (inst[0] === "spotify-this-song") {
      spootify();
    } else if (inst[0] === "movie-this") {
      moovie();
    }
  });
}

switch (input) {
  case "my-tweets":
    tweeter();
    break;
  case "spotify-this-song":
    spootify();
    break;
  case "movie-this":
    moovie();
    break;
  case "do-what-it-says":
    wildCard();
    break;
}
