const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

// Render 404 page for any unmatched routes
// router.get("*", (req, res) => {
//     res.render("404");
// });

module.exports = router;