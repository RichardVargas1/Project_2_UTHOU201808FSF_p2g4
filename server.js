// Require the express npm package
let express = require("express");
var models = require("./models");

// Require the passport npm package
//let passport = require("passport");

// Setting the port
let PORT = process.env.PORT || 7500;

const app = express();

const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
 
});
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


// const env = require("dotenv").load();

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
let htmlRoutes = require("./routes/htmlRoutes");
let apiRoutes = require("./routes/apiRoutes");

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//require("./config/passport.js")(passport, db.user);
//require("./routes/loginRoutes")(app, passport);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});
