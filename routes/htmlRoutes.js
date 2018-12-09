/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
// const models = require('../models');  ** need to add this back in

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/products/:cat", async (req, res) => {
    const cat = req.params.cat;
    // const product = await models['Product'].findAll({where: {type: cat}});
    const products = [
        {
            brand_name: "mybrand",
            additional_model_information: "my additional info",
            model_number: "model number",
            meets_most_efficient_criteria: "meets blabla"
        }
    ];
    res.render(cat, { products });
});

// Render 404 page for any unmatched routes
// router.get("*", (req, res) => {
//     res.render("404");
// });

module.exports = router;
