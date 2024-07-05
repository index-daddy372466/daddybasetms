const bp = require("body-parser");
const cors = require("cors");
const express = require('express')

module.exports = function middleware(app) {
  app.set('view engine','ejs')
  app.use(cors());
  app.use(express.json());
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));
  // connect point server to use custom webpack build/bundle
  app.use(express.static('client/public'))
};
