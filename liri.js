require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var input = process.argv[2];

if (input === "my-tweets") {
  tweeter()
}

function tweeter() {
  client.get("status/user_timeline", function(error, tweets, response) {
    if(error) {
      console.log("ERROR " + error);
    }
    console.log("These are mine tweets: " + tweets);
  });
}