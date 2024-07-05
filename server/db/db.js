require("dotenv").config();
const Pool = require("pg-pool");

const pool = new Pool({
  database: process.env.DB,
  user: process.env.DBU,
  password: process.env.DBPD,
  port: process.env.DBP,
  host:process.env.DBH,
  ssl: false,
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
});

module.exports = {pool}