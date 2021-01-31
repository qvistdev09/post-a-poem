const parse = require('../functions/parse');
const database = require("../../database");
const { Poem, Word } = database.models;

const get = {
  poems: (req, res) => {
    try {
      Poem.findAll({ order: [["createdAt", "DESC"]] }).then(data => {
        try {
          const parsedPoems = data
            .map(entry => ({
              content: entry.content,
              created: entry.createdAt,
            }))
            .map(parse.encodedPoemToJSON);
          res.json(parsedPoems);
        } catch (err) {
          res.json({ error: err.message });
        }
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
  words: (req, res) => {
    try {
      Word.findAll({
        order: database.Sequelize.literal("random()"),
        limit: 10,
      }).then(data => {
        try {
          const randomWords = data.map(entry => entry.content);
          res.json(randomWords);
        } catch (err) {
          res.json({ error: err.message });
        }
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = get;
