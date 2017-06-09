var express = require('express');
var path = require('path');
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// set port
var port = process.env.PORT || 8080;

// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Use morgan and body parser with our app
app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
// Serve static content for the app from the "public" directory in the application directory.

mongoose.Promise = Promise;

// Database configuration with mongoose
// mongoose.connect("mongodb://localhost/scrapple");

mongoose.connect("mongodb://heroku_h64rmn1s:t3a2cp6himpkku8likqkc25ieu@ds135700.mlab.com:35700/heroku_h64rmn1s");
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
var scrappleController = require("./controllers/scrappleController.js");

app.use("/", scrappleController);


app.listen(port, function() {
	console.log("app running");
})

module.exports = app;