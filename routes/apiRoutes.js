const express = require("express");
const router = express.Router();
const axios = require("axios");
const passport = require('passport')


require("../config/passport");
// Axios to pass API requirement
const request = axios.create({
    baseURL: "https://data.energystar.gov/resource",
    headers: { "X-App-Token": "rSGJanpH6okWzqMSAL4lRi4eh" }
});

const energyStarRoutes = {
    fridges: "/ymjh-yrse.json",
    dishwashers: "/v32c-ywkg.json",
    washers: "/k5sb-ibyp.json",
    dryers: "/cv4u-mmnf.json"
};

// Register route
router.post("/register", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Login route

router.post("/login", (req, res, next) => {
    console.log("here at least")
    passport.authenticate('local-signin', {}, (err, user, info) => {
        if(err) {
            return res.status(500).send({ message: "An error occured"})
        }
        if(!user) {
            return res.status(404).send(info)
        }
        return res.send({
            message: 'Login success',
            user
        })
    })(req, res, next)
})

router.post("/signup", (req, res, next) => {
    console.log("here at least")
    passport.authenticate('local-signup', {}, (err, user, info) => {
        console.log("Error: ", err)
        if(err) {
            return res.status(500).send({ message: "An error occured"})
        }
        if(!user) {
            return res.status(404).send(info)
        }
        return res.send({
            message: 'Login success',
            user
        })
    })(req, res, next)
})

router.get("/refresh/:cat", async (req, res) => {
    const cat = req.params.cat;
    const cats = Object.keys(energyStarRoutes);
    if (cats.indexOf(cat) === -1) {
        throw new Error("Category does not exist!");
    }
    const resp = await request.get(energyStarRoutes[cat]);
    console.log(resp.data[0]);
    res.send(resp);
});

module.exports = router;
