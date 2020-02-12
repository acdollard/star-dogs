let express = reqire("express")

// Requiring passport as we've configured it
var passport = require("./app/config/passport");

// Setting up port and requiring models for syncing
let PORT = process.env.PORT || 8080;
var db = require("./models");

let app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

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



