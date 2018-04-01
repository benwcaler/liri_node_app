require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var p1 = process.argv[3];
var p2 = process.argv[4];

if (input === "my-tweets") {
  tweeter(p1);
}

function tweeter() {
  client.get(
    "statuses/user_timeline",
    { screen_name: p1, count: 20 },
    (error, tweets, response) => {
      if (error) console.log(error);
      else {
        console.log("@" + p1 + "'s last twenty tweets: ");
        for (let i = 0; i < tweets.length; i++) {
          var element = tweets[i];
          console.log(element.created_at, ": ", element.text);
        }
        console.log(tweets)
      }
    }
  );
}
