const apiFunctions = require("../functions");
const database = require("../../database");
const { Poem, Word } = database.models;

const post = {
  poem: (req, res) => {
    try {
      const validated = apiFunctions.validate(req.body.input);
      const wordArray = apiFunctions.extractWords(validated);
      const wordPromises = wordArray.map(word => {
        return new Promise((resolve, reject) => {
          apiFunctions.checkIfAllowed(Word, word, resolve, reject);
        });
      });
      Promise.all(wordPromises)
        .then(values => {
          Poem.create({ content: validated }).then(() => {
            res.json({
              message: "Successfully created resource",
              words: values,
            });
          });
        })
        .catch(() => {
          res.json({ error: "Poem includes words that are not allowed" });
        });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = post;
