const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Populating req.cookies with an object keyed by the cookie names. 
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 7500;

// A middle to validator form entries
const expressValidator = require('express-validator');

// Library that helps hash passwords
const bcrypt = require('bcrypt');

// Following requires are Authenticaion NPM Packages:
// Create a session middleware with the given options.
const session = require('express-session');
const passport = require('passport');


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

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'ensights_db'
    });
};

// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

const sessionStore = new MySQLStore(options);

app.use(session({
    //
    secret: 'cookies',
    resave: false,
    store: sessionStore,
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
    function (email, password, done) {

        db.usertwos.findOne({ where: { email: email } }).then(user => {
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
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Syncing sequelize models, and then, start our Express app
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
