const express = require("express");
const sampleData = require("./sample-data/sample-poems.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "poems.db" });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed database connection", error);
  }
})();

const app = express();
app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { poems: sampleData });
});

app.listen(3000, () => {
  console.log("The server is running");
});
