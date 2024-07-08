const pool = require("../db/db.js").pool;
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const path = require("path");
// const checkNotAuthenticated = require("../app.js");
// index homepage
router.get("/", (req, res) => {
  res.render("home");
});
module.exports = router;
