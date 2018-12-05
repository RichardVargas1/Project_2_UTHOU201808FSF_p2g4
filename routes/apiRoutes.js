const express = require("express");
const router = express.Router();

// Register route
router.post("/register", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Login route
router.post("/login", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
