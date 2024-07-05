const pool = require("../db/db.js").pool;
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const path = require("path");
// index homepage
router.get("/", (req, res) => {
  res.json({ message: "You made it to index!" });
});
// index - login page to submit email & password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // find user by querying from auth db based on [email] entered
  const userFound = await pool.query(
    "select password from auth where email=$1",
    [email]
  );
  const users = userFound.rows;
  try {
    // if user is matched from auth db (which every user is required to have)
    if (users.length > 0) {
      // store user's password into pw
      let pw = users[0].password;
      // if no data entered for pw field
      if (!pw) {
        // redirect back to login
        console.log("nothing was entered");
        res.redirect("/auth/login");
      } else {
        // for truthy, compare entered password & has from database
        let approved = bcrypt.compareSync(password, pw);
        // if passord matches,
        if (approved) {
          // send user/customer to home page
          res.render("home", {
            email,
            password,
          });
        } else {
          // redirect user/customer back to login
          console.log("invalid password");
          res.redirect("/auth/login");
        }
      }
    } else {
      // if email is not found, redirect back to login.
      // emails must be exactly what is entered in db
      console.log("invalid email");
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
