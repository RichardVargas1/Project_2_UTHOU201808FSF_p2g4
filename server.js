// Require the express npm package
let express = require("express");

// Require the passport npm package
let passport = require("passport");

// Setting the port
let PORT = process.env.PORT || 7500;

let app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as a JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require the express-handlebars npm package
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
let routes = require("");

app.use(routes);
require("./config/passport.js")(passport, db.user);
require("./routes/loginRoutes")(app, passport);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});
