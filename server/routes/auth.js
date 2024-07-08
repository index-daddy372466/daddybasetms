const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db/db.js").pool;
const path = require("path");
const router = express.Router();
const passport = require("passport");

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
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.sendFile(pages + "/login.html");
});
router.get("/register", checkNotAuthenticated, (req, res) => {
  res.sendFile(pages + "/register.html");
});
router.get("/inv", (req, res) => {
  res.sendFile(pages + "/invitation.html");
});

// register a user
router.post("/register", async (req, res) => {
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

// login a user with passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/idx/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
// login a user
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   // find user by querying from auth db based on [email] entered
//   const userFound = await pool.query(
//     "select password from auth where email=$1",
//     [email]
//   );
//   const users = userFound.rows;
//   try {
//     // if user is matched from auth db (which every user is required to have)
//     if (users.length > 0) {
//       // store user's password into pw
//       let pw = users[0].password;
//       // if no data entered for pw field
//       if (!pw) {
//         // redirect back to login
//         console.log("nothing was entered");
//         res.redirect("/auth/login");
//       } else {
//         // for truthy, compare entered password & has from database
//         let approved = bcrypt.compareSync(password, pw);
//         console.log(approved);
//         // if passord matches,
//         if (approved) {
//           // send user/customer to home page
//           res.render("home", {
//             email: req.user.email,
//           });
//         } else {
//           // redirect user/customer back to login
//           console.log("invalid password");
//           res.redirect("/auth/login");
//         }
//       }
//     } else {
//       // if email is not found, redirect back to login.
//       // emails must be exactly what is entered in db
//       console.log("invalid email");
//       res.redirect("/auth/login");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth success");
    res.redirect("/idx/");
  } else {
    console.log("auth failed");
  }
  next();
}
module.exports = router;
