require("dotenv").config();
const path = require("path");
const storage = path.join(__dirname, "../../db.sqlite");

module.exports = {
  development: {
    dialect: "sqlite",
    storage,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
