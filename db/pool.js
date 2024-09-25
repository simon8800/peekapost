require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
});
