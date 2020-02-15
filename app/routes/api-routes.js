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
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }

  });








  // POST route for saving a new dog
  app.post("/api/dogs", async function(req, res) {
    console.log(req.body);
    
    // await sortSign(req.body.bDay),


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
    })
      .then(function() {
        res.redirect(307, "/../public/stylesheets/members");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });;
  })

// POST route for logging user in
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });



  async function sortSign(birthday) {
    dayjs.extend(customParseFormat);
    let parseBirthday =  dayjs(birthday, "YYYY-MM-DD");
         console.log(parseBirthday);
         
    if( dayjs().month(1).isBefore(dayjs(), parseBirthday) && dayjs().date(18).isAfter(dayjs(), parseBirthday) &&  ){
      console.log("Starsign: " + starSign);
      starSign = "Aquarius";
    };
    return starSign;
  



        //  let starSign = "";
        //  if(  dayjs().month(1).date(20).isBefore(dayjs(), parseBirthday) && dayjs().month(2).date(18).isAfter(dayjs(), parseBirthday)  )
        //  {
        //    starSign = "Aquarius"
        //    console.log(starSign);
        //   } else {
        //     starSign = "Hey!"
        //   }
        //   return starSign
        // else if (  dayjs().month(2).date(19).isBefore(dayjs(), parseBirthday) && dayjs().month(3).date(20).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Pices"
      //     console.log(starSign);
      //   } else if (  dayjs().month(3).date(21).isBefore(dayjs(), parseBirthday) && dayjs().month(4).date(19).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Aries"
      //     console.log(starSign);
      //   } else if (  dayjs().month(4).date(20).isBefore(dayjs(), parseBirthday) && dayjs().month(5).date(20).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Taurus"
      //     console.log(starSign);
      //   } else if (  dayjs().month(5).date(21).isBefore(dayjs(), parseBirthday) && dayjs().month(6).date(20).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Gemeni"
      //     console.log(starSign);
      //   } else if (  dayjs().month(6).date(21).isBefore(dayjs(), parseBirthday) && dayjs().month(7).date(22).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Cancer"
      //     console.log(starSign);
      //   } else if (  dayjs().month(7).date(23).isBefore(dayjs(), parseBirthday) && dayjs().month(8).date(22).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Leo"
      //     console.log(starSign);
      //   } else if (  dayjs().month(8).date(23).isBefore(dayjs(), parseBirthday) && dayjs().month(9).date(22).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Virgo"
      //     console.log(starSign);
      //   } else if (  dayjs().month(9).date(23).isBefore(dayjs(), parseBirthday) && dayjs().month(10).date(22).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Libra"
      //     console.log(starSign);
      //   } else if (  dayjs().month(10).date(23).isBefore(dayjs(), parseBirthday) && dayjs().month(11).date(21).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Scorpio"
      //     console.log(starSign);
      //   } else if (  dayjs().month(11).date(22).isBefore(dayjs(), parseBirthday) && dayjs().month(12).date(21).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Sagittarius"
      //     console.log(starSign);
      //   } else if (  dayjs().month(12).date(22).isBefore(dayjs(), parseBirthday) && dayjs().month(1).date(19).isAfter(dayjs(), parseBirthday)  )
      //   {
      //     starSign = "Capricorn"
      //     console.log(starSign);
      //   };
      //   console.log(starSign);
 };


};


