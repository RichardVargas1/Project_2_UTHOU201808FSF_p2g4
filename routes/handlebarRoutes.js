/* eslint-disable camelcase */
/// *********************************************************************************
// this file offers a set of routes for sending users to the various handlebar pages

// Dependencies =============================================================
// const express = require("express");
// const router = express.Router();
// const path = require("path");

// Routes =============================================================
module.exports = function(app) {
    // Each of the below routes just handles the handlebar page that the user gets sent to.

    // Login Routes
    app.get("/login", (req, res) => {
        res.render("login");
    });
    app.get("/register", (req, res) => {
        res.render("register");
    });

    // Main Page Route
    app.get("/", (req, res) => {
        res.render("index");
    });

    // users route to to products
    // app.get("/products", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../views/login.handlebars"));
    // });

    // users route to products/dishwashers
    app.get("/dishwashers", (req, res) => {
        res.render("dishwashers");
    });

    // users route to products/fridges
    app.get("/fridges", (req, res) => {
        res.render("fridges");
    });

    // users route to products/washers
    app.get("/washers", (req, res) => {
        res.render("washers");
    });

    // users route to products/dryers
    app.get("/dryers", (req, res) => {
        res.render("dryers");
    });

    // Render 404 page for any unmatched routes
    // app.get("*", (req, res) => {
    //     res.render("404");
    // });
};

//Need to add this back for table display
// router.get("/products/:cat", async (req, res) => {
//     const cat = req.params.cat;
//     // const product = await models['Product'].findAll({where: {type: cat}});
//     const products = [
//         {
//             brand_name: "mybrand",
//             additional_model_information: "my additional info",
//             model_number: "model number",
//             meets_most_efficient_criteria: "meets blabla"
//         }
//     ];
//     res.render(cat, {
//         products
//     });
// });
