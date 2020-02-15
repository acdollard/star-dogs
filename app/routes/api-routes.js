// api-routes.js - this file offers a set of routes for displaying and saving data to the db


// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");
const passport = require("../config/passport")


// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the dogs
  app.get("/api/dogs/", function(req, res) {
    db.Dog.findAll({
      where: {
        owner: req.params.owner
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for returning dogs of a specific category
  app.get("/api/dogs/starSign/:sign", function(req, res) {
    db.Dog.findAll({
      where: {
        starSign: req.params.starSign,
        owner: req.params.owner
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single dog
  app.get("/api/dogs/:id", function(req, res) {
    db.Dog.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new dog
  app.post("/api/dogs", function(req, res) {
    console.log(req.body);
    db.Dog.create({
      name: req.body.name,
      birthDate: req.body.birthDate,
      breed: req.body.breed,
      starSign: req.params.starSign
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting dogs
  app.delete("/api/dogs/:id", function(req, res) {
    db.Dog.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating dogs
  app.put("/api/dogs", function(req, res) {
    db.User.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  // POST route for signing user up
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    });
      })};
