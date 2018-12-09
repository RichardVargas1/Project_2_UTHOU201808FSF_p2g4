<<<<<<< HEAD
// Require the express npm package
let express = require("express");
const models = require("./models");
=======
// Following requires are Authenticaion NPM Packages:
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
>>>>>>> 8cb0b5362d776cc923b85ab6d133f0e042c33afa

// Populating req.cookies with an object keyed by the cookie names. 
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 7500;

// A middle to validate form entries
const expressValidator = require('express-validator');

<<<<<<< HEAD
const app = express();

const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

//Sync Database
models.sequelize
    .sync()
    .then(function() {
        console.log("Nice! Database looks fine");
    })
    .catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!");
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
=======
// Requiring (For Windows) bcyrpt-nodejs.
const bcrypt = require('bcrypt-nodejs');
>>>>>>> 8cb0b5362d776cc923b85ab6d133f0e042c33afa

// Requiring models for syncing pages
const db = require("./models");

// Express app to handle data parsing
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(expressValidator());//this line must be after bodyparser middleware
app.use(cookieParser());// app.use cookieParser, use for application

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ensights_db'
}

const sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'secretCookies',
    store: sessionStore,
    resave: false,
    // This creates a cookie upon user login
    saveUninitialized: false
}));

// Set Up Passport & Initialize
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// User Login Authenication

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.findOne({ username: username }).then(user => {
            console.log('Login Information');
            // console.log(user.dataValues.password);
            if (user) {
                const hash = user.dataValues.password
                const id = user.dataValues.id
                // compare passwords for hasing, or acquiring a number from an object
                bcrypt.compare(password, hash, function (err, response) {
                    if (response === true) {
                        return done(null, { user_id: id });
                    } else {
                        return done(null, false);
                    }
                });
            } else {
                done(user);
            }
        });
    }
));

// Set Up Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// App Routes =============================================================
require("./routes/apiRoutes.js");
require("./routes/authenticationRoutes.js")(app);
require("./routes/login-logoutRoutes.js")(app);
require("./routes/loginApiRoutes.js")(app);
require("./routes/searchHistoryRoutes.js");

// Syncing sequelize models, and then, start our Express app
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
