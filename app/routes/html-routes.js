// html-routes.js - this file offers a set of routes for sending users to the constious html pages


// Dependencies
// =============================================================

const express = require('express');
const path = require('path');
const passport = require("../config/passport")
const isAuthenticated = require("../config/middleware/isAuthenticated");



// Routes
// =============================================================
module.exports = function(app) {


  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Get route for homepage
  app.get("/" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public' +  '/landingPage.html'));

  });

  // Get route for login page
  app.get("/login" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public' +  '/login.html'));

  });

  // Get route for members and their dogs
  app.get("/members" , isAuthenticated, function(req,res){
    res.sendFile(path.join(__dirname + '/../public' + '/members.html'));
  });

  // Get route for signup page
  app.get("/signup" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public/signup.html'));

  });

    // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("HELLO:?");
    req.logout();
    res.redirect("/");
      console.log("Lg out plz");
      // res.sendFile(path.join(__dirname + '/../public/landingPage.html'));
      // res.sendFile(path.join(__dirname + '/../public' + '/stylesheets' + '/landingPage.html'));

  });
}
