const express = require("express");
const initialize = require("./passport-config.js");
const app = express();
const PORT = !process.env.PORT ? 3005 : process.env.PORT;
const middleware = require("./lib/middleware.js");
const routes = require("./lib/routes.js");
const pool = require("./db/db.js").pool;
const passport = require("passport");
// initialize passport
initialize(
  passport,
  async (email) => {
    let u = await pool.query("select * from auth where email=$1", [email]);
    let users = u.rows;
    return users.find((l) => l.email === email);
  },
  async (id) => {
    let u = await pool.query("select * from users where user_id=$1", [id]);
    let users = u.rows;
    return users.find((l) => l.user_id === id);
  }
);
// middleware
middleware(app);
// routes
routes(app);

app.listen(PORT, () => {
  console.log("You are listening on port " + PORT);
});

app.use((req, res) => {
  if (res.status >= 400) {
    res.json({ title: "Page is not found." });
  }
});

function checkAuthenticated(req, res, next) {
  console.log(req.isAutneticated())
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/idx/')
  }
  next();
  
}