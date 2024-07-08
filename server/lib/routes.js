  // main route index between departments, or /endpoint

  // require all routes
  const objOfRoutes = require("./routeData.js");
  // loop through the developer routes during development
  module.exports = function routes(app) {
    app.use('/idx',objOfRoutes.developer.idxRoute)
    app.use('/api',objOfRoutes.developer.apiRoute)
    app.use('/dev',objOfRoutes.developer.devRoute)
    app.use('/auth',objOfRoutes.developer.authRoute)
    // console.log(objOfRoutes.developer)
  };

