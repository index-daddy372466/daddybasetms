const pool = require("../db/db.js").pool;
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const path = require("path");
// index homepage
router.get("/", (req, res) => {
  res.json({ message: "You made it to index!" });
});

module.exports = router;
