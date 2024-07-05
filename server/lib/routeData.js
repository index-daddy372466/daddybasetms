
const objOfRoutes = {
  developer: {
    idxRoute: require("../routes/idx.js"),
    apiRoute: require("../routes/api.js"),
    devRoute: require("../routes/developers.js"),
    authRoute: require("../routes/auth.js")
  },
  lead: {
    idxRoute: require("../routes/idx.js"),
    apiRoute: require("../routes/api.js"),
    devRoute: require("../routes/developers.js"),
    revRoute: require("../routes/reviews.js"),
    famRoute: require("../routes/users.js"),
  },
  admin: {
    idxRoute: require("../routes/idx.js"),
    apiRoute: require("../routes/api.js"),
    devRoute: require("../routes/developers.js"),
    repRoute: require("../routes/reports.js"),
    revRoute: require("../routes/reviews.js"),
    secRoute: require("../routes/sec.js"),
    sposRoute: require("../routes/sponsors.js"),
    famRoute: require("../routes/users.js"),
  },
};

module.exports = objOfRoutes