// *********************************************************************************
// this file offers a set of routes for sending users to the various handlebar pages

// Dependencies =============================================================
const express = require("express");
const router = express.Router());

// Routes =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the handlebar page that the user gets sent to.

  // main route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.handlebars"));
  });

  // users route to to products
  app.get("/products", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.handlebars"));
  });

  // users route to products/dishwashers
  app.get("/products/dishwashers", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dishwashers.handlebars"));
  });

  // users route to products/fridges
  app.get("/products/fridges", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/fridges.handlebars"));
  });

  // users route to products/washers
  app.get("/products/washers", function(req, res) {
    res.sendFile(path.join(__dirname, "../view/washers.handlebars"));
  });

  // users route to products/dryers
  app.get("/products/dryers", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dryers.handlebars"));
  });

};
