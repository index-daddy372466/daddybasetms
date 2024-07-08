require("dotenv").config();
const bp = require("body-parser");
const cors = require("cors");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const initialize = require("../passport-config.js");

module.exports = function middleware(app) {
  app.set("view engine", "ejs");
  app.use(cors());
  app.use(express.json());
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // connect point server to use custom webpack build/bundle
  app.use(express.static("client/public"));
};
