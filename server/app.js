const express = require("express");
const passPort = {
  pp: require("passport"),
  pl: require("passport-local"),
  pg: require("passport-github2"),
};
const app = express();
const PORT = !process.env.PORT ? 3005 : process.env.PORT;
const middleware = require("./lib/middleware.js");
const routes = require("./lib/routes.js");

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
