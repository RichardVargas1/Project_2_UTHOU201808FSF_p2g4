const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// Create login route like the one above

module.exports = router;
