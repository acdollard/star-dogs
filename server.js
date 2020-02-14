
const express = require("express");
const session = require("express-session");



// Requiring passport as we've configured it
const passport = require("./app/config/passport");

// Setting up port and requiring models for syncing

const PORT = process.env.PORT || 8080;
const db = require("./app/models");



// Sets up the Express app to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./app/public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require routes folder
require(`./app/routes/api-routes`)(app);
require(`./app/routes/html-routes`)(app);


// Starts the server to begin listening
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  })



