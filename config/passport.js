// http://www.passportjs.org/docs/authorize/

const passport = require("passport");

// Passport Strategy for authenticating with Username and password
const LocalStrategy = require("passport-local").Strategy;

// Load user model
const db = require("../models");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        function(email, password, done) {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function(dbUser) {
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect email."
                    });
                } else if (!dbUser.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return done(null, dbUser);
            });
        }
    )
);

// Serializes the user info during the session as an object of req.session.passport.user  {}, which is saved to the session
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

// Matches the true user with the hash for the user during the session to store the session info after the session has ended
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;
