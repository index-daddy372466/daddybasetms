const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db/db.js").pool;
const path = require("path");
const router = express.Router();
const pages = path.resolve(
  __dirname,
  "..",
  "..",
  "client",
  "src",
  "users",
  "specific"
);
// serve static files
router.get("/login", (req, res) => {
  res.sendFile(pages + "/login.html");
});
router.get("/register", (req, res) => {
  res.sendFile(pages + "/register.html");
});
router.get("/inv", (req, res) => {
  res.sendFile(pages + "/invitation.html");
});

// register a user
router.post("/register-user", async (req, res) => {
  const saltRounds = 11;
  const { first_name, last_name, password, email } = req.body;
  // get all users
  const userFound = await pool.query("select * from users");
  let existingAccount = userFound.rows.filter((_, idx) => _.email === email);
  console.log(existingAccount);
  try {
    if (existingAccount.length > 0) {
      console.log("user already exists in db");
      res.sendFile(pages + "/register.html");
    } else {
      const hashedPw = await bcrypt.hash(password, saltRounds);
      await pool.query(
        "insert into users(first_name,last_name,email) values($1,$2,$3)",
        [first_name, last_name, email]
      );
      await pool.query("insert into auth(email,password) values($1,$2)", [
        email,
        hashedPw,
      ]);
      res.sendFile(pages + "/login.html");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
