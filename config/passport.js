const passport = require("passport");
const bCrypt = require("bcrypt-nodejs");

// Passport Strategy for authenticating with Username and password
const LocalStrategy = require("passport-local").Strategy;

// Load user model
const db = require("../models");

passport.use(
    "local-signin",
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, email, password, done) {
            console.log("here??");
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function (dbUser) {
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect email."
                    });
                }

                const passwordValid = bCrypt.compare(password, dbUser.password);
                if (!passwordValid) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return done(null, dbUser);
            });
        }
    )
);

passport.use("local-signup",
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true
            },
            function (email, password, done) {
                db.User.findOne({
                    where: {
                        email: email
                    }
                }).then(function (dbUser) {
                    const generateHash = function (password) {
                        return bCrypt.hashSync(
                            password,
                            bCrypt.genSaltSync(8),
                            null
                        );
                    };

                    if (dbUser) {
                        return done(null, false, {
                            message: "This email is associated with an account"
                        });
                    }
                    let username = req.body.username;
                    let reqPassword = req.body.password;
                    let email = req.body.username;

                    let password = generateHash(reqPassword);

                    const newUser = db.User.build({
                        username,
                        email,
                        password
                    });

                    newUser
                        .save()
                        .then(savedUser => {
                            done(null, savedUser);
                        });
                    // .catch(error => {
                    //     done(err, false);
                });

                // Serializes the user info during the session as an object of req.session.passport.user  {}, which is saved to the session
                passport.serializeUser(function (user, cb) {
                    cb(null, user);
                });

                // Matches the true user with the hash for the user during the session to store the session info after the session has ended
                passport.deserializeUser(function (obj, cb) {
                    cb(null, obj);
                });

                // module.exports = passport;