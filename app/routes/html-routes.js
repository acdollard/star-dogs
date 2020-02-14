// html-routes.js - this file offers a set of routes for sending users to the constious html pages


// Dependencies
// =============================================================

const express = require('express');
const path = require('path');

// Routes
// =============================================================
module.exports = function(app) {


  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Get route for homepage
  app.get("/" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public' + '/stylesheets' + '/landingPage.html'));

  });

  // Get route for login page
  app.get("/login" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public' + '/stylesheets' + '/login.html'));

  });

  // Get route for members and their dogs
  app.get("/members" , function(req,res){

    res.sendFile(path.join(__dirname + '/members.html'));

  });

  // Get route for signup page
  app.get("/signup" , function(req,res){

    res.sendFile(path.join(__dirname + '/../public/stylesheets/signup.html'));

  });
}
