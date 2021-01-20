const express = require("express");
const sampleData = require("./sample-data/sample-poems.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "poems.db" });

// Poem model
class Poem extends Sequelize.Model {}
Poem.init(
  {
    content: Sequelize.STRING,
    date: Sequelize.DATE,
  },
  { sequelize }
);

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Successfully synced");
  } catch (error) {
    console.error("Error connecting to database", error);
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
