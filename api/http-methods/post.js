const database = require("../../database");
const validate = require("../functions/validate");
const { Poem, Word } = database.models;

const post = {
  poem: (req, res) => {
    try {
      const incomingString = req.body.input;
      const validatedFormat = validate.format(incomingString);
      const validatedWordCount = validate.wordCount(validatedFormat);
      validate.allWordsAllowed(
        validatedWordCount,
        Word,
        error => {
          res.json({ error: error.message });
        },
        validatedWords => {
          Poem.create({ content: validatedWordCount }).then(() => {
            res.json({
              message: "Succesfully posted poem",
              words: validatedWords,
            });
          });
        }
      );
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = post;
