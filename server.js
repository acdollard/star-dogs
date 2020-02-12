let express = reqire("express");
let session = require("express-session");

// Requiring passport as we've configured it
let passport = require("./app/config/passport");

// Setting up port and requiring models for syncing
let PORT = process.env.PORT || 8080;
let db = require("./models");


// Sets up the Express app to handle data parsing
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Set Handlebars.
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require routes folder
require("./routes")(app);

// Starts the server to begin listening
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  })



