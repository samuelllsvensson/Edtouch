const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "photoshopify_db",
  password: "keila123",
  post: 5432,
});

module.exports = pool;
