// api-routes.js - this file offers a set of routes for displaying and saving data to the db



// Dependencies
// =============================================================

// Requiring our models
const db = require("../models");
const passport = require("../config/passport");
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');





//connection to sql database outside of sequelize
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "acdollard",
  // Your password
  password: "WalkTheDog!",
  database: "star_dogs"
});

connection.connect(function(err) {
  if (err) throw err;
});




// Routes
// =============================================================
module.exports = function(app) {

// console.log(user.id);

  // GET route for getting all of the dogs
  app.get("/api/dogs", function(req, res) {
    console.log(req.user.id);
    db.Dog.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(function(results) {
        let usersDogs = [];


        res.json(results);



        console.log(results);
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
      // console.log(res);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }

  });


//this will eventually be the /api/horoscopes route
  connection.query(`SELECT * FROM Horoscopes WHERE ? ORDER BY RAND() LIMIT 1;`, 
   {
      sign:"Aries"
  }, 
  function(err, results) {
    if(err) throw new Error("problem fetching horoscopes");
    console.log(results);
  })




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


  //this is a raw db query since there is no model for horoscopes
  app.get("/api/horoscopes", function(req, res) {
    db.query(`SELECT * FROM table_name WHERE sign=${req.sign} ORDER BY RAND() LIMIT 1`,
    function(err, results) {
      if(err) throw new Error("problem fetching horoscopes");
      res.json(results);
    })
  })



  // POST route for signing user up
  app.post("/api/signup", function(req, res, next) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    next();
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



