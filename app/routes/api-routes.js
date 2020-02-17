// api-routes.js - this file offers a set of routes for displaying and saving data to the db


// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");
const passport = require("../config/passport");
const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');


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








  app.get("/api/user_data", async function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(res);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }

  });








  // POST route for saving a new dog
  app.post("/api/dogs", async function(req, res) {
    console.log(req.body);
    
      db.Dog.create({
        name: req.body.name,
        birthday: req.body.bDay,
        breed: req.body.breed,
        sign: await sortSign(req.body.bDay),
        UserId: req.user.id
      })
      .then(function(newDog){
        console.log(newDog);
        res.json(newDog);
      })

    
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
  });
      

// POST route for logging user in
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });



  async function sortSign(birthday) {
    dayjs.extend(customParseFormat);
    let parseBirthday =  dayjs(birthday, "YYYY-MM-DD");
         console.log(parseBirthday);
         console.log(birthday);

         
    if((parseBirthday.$M === 0 && parseBirthday.$D >= 20) || (parseBirthday.$M === 1 && parseBirthday.$D <= 18)){
      starSign = "Aquarius";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 1 && parseBirthday.$D >= 19) || (parseBirthday.$M === 2 && parseBirthday.$D <= 20)){
      starSign = "Pices";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 2 && parseBirthday.$D >= 21) || (parseBirthday.$M === 3 && parseBirthday.$D <= 19)){
      starSign = "Aries";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 3 && parseBirthday.$D >= 19) || (parseBirthday.$M === 4 && parseBirthday.$D <= 20)){
      starSign = "Taurus";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 4 && parseBirthday.$D >= 19) || (parseBirthday.$M === 5 && parseBirthday.$D <= 20)){
      starSign = "Gemeni";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 5 && parseBirthday.$D >= 21) || (parseBirthday.$M === 6 && parseBirthday.$D <= 22)){
      starSign = "Cancer";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 6 && parseBirthday.$D >= 23) || (parseBirthday.$M === 7 && parseBirthday.$D <= 22)){
      starSign = "Leo";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 7 && parseBirthday.$D >= 23) || (parseBirthday.$M === 8 && parseBirthday.$D <= 22)){
      starSign = "Virgo";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 8 && parseBirthday.$D >= 23) || (parseBirthday.$M === 9 && parseBirthday.$D <= 22)){
      starSign = "Libra";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 9 && parseBirthday.$D >= 23) || (parseBirthday.$M === 10 && parseBirthday.$D <= 21)){
      starSign = "Scorpio";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 10 && parseBirthday.$D >= 22) || (parseBirthday.$M === 11 && parseBirthday.$D <= 21)){
      starSign = "Sagittarius";
      console.log("Starsign: " + starSign);
      return starSign;
    } else if ((parseBirthday.$M === 11 && parseBirthday.$D >= 22) || (parseBirthday.$M === 11 && parseBirthday.$D <= 19)){
      starSign = "Sagittarius";
      console.log("Starsign: " + starSign);
      return starSign;
    }
     else console.log("Error with Sign!");
  
 };
};



