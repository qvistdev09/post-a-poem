const express = require("express");
const bodyParser = require("body-parser");
const api = require('./api');

const database = require("./database");
const { Poem, Word } = database.models;

const samplePoems = require("./sample-data/sample-poems.json");
const sampleWords = require("./sample-data/sample-words.json");

(async () => {
  await database.sequelize.sync({ force: true });
  samplePoems.forEach(async entry => {
    await Poem.create({ content: entry });
  });
  sampleWords.forEach(async entry => {
    await Word.create({ content: entry });
  });
})();

const app = express();
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(/^\/api/, api);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("The server is running");
});
