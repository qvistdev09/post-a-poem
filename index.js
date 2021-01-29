const api = require("./api/api");
const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const { Poem } = database.models;

const sampleData = require("./sample-data/sample-poems.json");

(async () => {
  await database.sequelize.sync({ force: true });
  sampleData.forEach(async entry => {
    await Poem.create({ content: entry });
  });
})();

const app = express();
app.use(bodyParser.json());
app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/api", api.post);
app.get("/api", api.get);

app.listen(3000, () => {
  console.log("The server is running");
});
