const express = require("express");
const bodyParser = require("body-parser");
const apiController = require('./api/api-controller');
const devService = require('./dev-service');

devService.syncAndPopulate();

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(/^\/api/, apiController);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("The server is running");
});
