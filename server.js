//Dependencies

const express = require("express");
const logger = require("morgan");
var mongoose = require("mongoose");

//Require axios and cheerio.
var axios = require("axios");
var cheerio = require("cheerio");

//models
var db = require("./models");

var PORT = process.env.PORT || 5000;
//Express
var app = express();

//morgan
app.use(logger("dev"));

//parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Make public a static folder
app.use(express.static("public"));

//Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MNS_db";
mongoose.connect(MONGODB_URI , { useNewUrlParser: true });

//Routes
//A GET rout scraping GPB
app.get("/scrape", function(req, res) {
  //Request via axios
  axios.get("https://www.gpbnews.org").then(function(response) {
    //body axios to cheerio
    var $ = cheerio.load(response.data);
    // Get text and href of each link in element
    
    var resultArray = [];
    $("h2").each(function(i, element) {

      var result ={};
      result.title = $(this)
        .children("a")
        .text();
      result.summary = $(this)
        .parent().parent().children(".content").find("p").text();
        // .text();
      result.link = $(this)
        .children("a")
        .attr("href");

        if(result.title !="" && result.link.slice(0,4) != "http"){
        result.link = "https://www.gpbnews.org"+result.link;
        resultArray.push(result)
      }      

      // Insert the data in the scrapedArticle db
      db.Article
        .create(result)
        .then(function(dbscrapedArticle) {
          //View the result
          console.log(dbscrapedArticle);
        })
        .catch(function(err) {
          //If error occurred
          console.log(err);
        });
    });

  });
  
  res.send("Scrape Completed");
});

//Route for getting all
app.get("/articles", function(req, res) {
  // Grab documents in articles collection
  db.Article
    .find({})
    .then(function(dbscrapedArticle) {
      //if success send back to client
      res.json(dbscrapedArticle);
    })
    .catch(function(err) {
      //If error
      res.json(err);
    });
});

//Route to grab a specific article bt id and populate with note
app.get("/articles/:id", function(req, res) {
  //Using the id passed in the id parameter, prepare a query that finds matching one in db
  db.Article
    .findOne({ _id: req.params.id })
    // ...and populate all of the notes associated with it
    .populate("note")
    .then(function(dbscrapedArticle) {
      //If successful, find article with id and sned back to client
      res.json(dbscrapedArticle);
    })
    .catch(function(err) {
      //If error occur, send to client
      res.json(err);
    });
});

// Listen port 5000

  app.listen(PORT, function() {
    console.log("App running port 5000");
  });