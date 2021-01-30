const input = require("./input");
const database = require("../database");
const { Poem } = database.models;

const post = (req, res) => {
  try {
    const validated = input.validate(req.body.input);
    Poem.create({ content: validated }).then(() => {
      res.json({ message: "Resource created successfully" });
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const get = (req, res) => {
  try {
    Poem.findAll().then(data => {
      try {
        const parsedPoems = data
          .map(entry => ({ content: entry.content, created: entry.createdAt }))
          .map(input.parse);
        res.json(parsedPoems);
      } catch (err) {
        res.json({ error: err.message });
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports.post = post;
module.exports.get = get;
