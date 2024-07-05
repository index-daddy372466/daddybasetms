const path = require("path");
const HtmlPlug = require("html-webpack-plugin");
const CssPlug = require("mini-css-extract-plugin");
const pathRewrites = {
  "^/(apis|reviews|users|developers|index|sponsors|security|reports)$": "",
};
const expPort = !process.env.PORT ? 3005 : process.env.PORT;

module.exports = {
  // mode
  mode: "development", // || production
  // entry
  entry: path.resolve(__dirname, "client/src/index.js"),

  resolve: {
    alias: {
      Common: path.resolve(__dirname, "client/src/common"),
      Specific: path.resolve(__dirname, "client/src/specific"),
    },
  },
  module: {
    rules: [
      { test: /\.js$/i, exclude: /node_modules/i },
      {
        test: /\.css$/i,
        exclude: /node_modules/i,
        use: [CssPlug.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  // plugins
  plugins: [
    new CssPlug({
      filename: "styles.css",
      linkType: "text/css",
      insert: function (tag) {
        const newCss = document.querySelector("#css-321");
        if (newCss) {
          reference.parentNode.insertBefore(tag, newCss);
        }
      },
    }),
    ,
    new HtmlPlug({
      template: "client/template/template.html",
      filename: "index.html",
      // base: false,
      // cache: false,
      // hash: false,
      inject: "body",
      title: "User login/Regtistration",
    }),
  ],  
  devServer: {
    hot: true,
    client: {
      logging: "info",
    },
    port: 4566,
    allowedHosts: [".localhost:" + expPort],

    proxy: [
      {
        // branches of the application
        context: [
          "/api",
          "/rev",
          "/fam",
          "/dev",
          "/auth",
          "/spos",
          "/sec",
          "/rep",
          "/idx",
          "/inv",
        ],
        target: "http://localhost:" + expPort,
        pathRewrite: pathRewrites,
        secure: true,
      },
    ],
  },
  // output
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: "[name].bundle.js",
  },
};
