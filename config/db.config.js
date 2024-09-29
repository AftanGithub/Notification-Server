require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: "postgres",
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };