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
  await sequelize.sync();
})();

const app = express();
app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const poems = await Poem.findAll();
  const parsedPoems = poems.map((poem) => poem.toJSON().content);
  res.render("index", { poems: parsedPoems });
});

app.listen(3000, () => {
  console.log("The server is running");
});
