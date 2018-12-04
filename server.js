// Require the express npm package
var express = require("express");

// Setting the port
var PORT = process.env.PORT || 7500;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as a JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require the express-handlebars npm package
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
var routes = require("");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
