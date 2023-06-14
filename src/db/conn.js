const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "ocr",
  username: "postgres",
  password: "aspire@123",
  dialect: "postgres",
  host: "192.168.2.108",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  storage: "path/to/database.sqlite",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established and models synchronized.");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

module.exports = {sequelize};
