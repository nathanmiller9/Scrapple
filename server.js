var express = require('express');
var path = require('path');
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// set port
var port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')));

/* Showing Mongoose's "Populated" Method (18.3.8)
 * INSTRUCTOR ONLY
 * =============================================== */

// Dependencies

var methodOverride = require("method-override");


// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");




// Serve static content for the app from the "public" directory in the application directory.


// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
// Serve static content for the app from the "public" directory in the application directory.

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));






// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scrapple");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======
// Import routes and give the server access to them.
var routes = require("./controllers/scrappleController.js");

app.use("/", routes);




app.listen(port, function() {
	console.log("app running");
})