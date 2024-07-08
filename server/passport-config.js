const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/db.js").pool;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (e, p, d) => {
    const user = await getUserByEmail(e);
    if (!user)
      return d(null, false, { message: "no user found with this email" });

    try {
      if (await bcrypt.compare(p, user.password)) {
        // take user to users db
        const users = await pool.query("select * from users where email=$1", [
          e,
        ]);
        const uRows = users.rows;
        const ureal = uRows[0];
        return d(null, ureal);
      } else {
        return d(null, false, { message: "incorrect pasword" });
      }
    } catch (err) {
      return d(err);
    }
  };
  // declare local strategy
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  // serialize user
  passport.serializeUser( function(user, done){
    return done(null, user.user_id);
  });
  // deserialize user
  passport.deserializeUser( function(id, done){
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
