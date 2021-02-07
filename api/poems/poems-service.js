// handles requests from controller, gets entries from db and parses
const poemsRepo = require('./poems-repo');
const poemsParser = require('./poems-parser');
const poemsValidation = require('./poems-validation');
const wordsService = require('../words/words-service');

const servePoems = async () => {
  try {
    const poems = await poemsRepo.getPoems();
    const parsedPoems = poems.map(poemsParser.encodedPoemToJSON);
    return parsedPoems;
  } catch (error) {
    throw error;
  }
};

const postPoem = async string => {
  try {
    if (poemsValidation.formatIsValid(string)) {
      const poemWords = poemsValidation.extractWords(string);
      await wordsService.allAllowed(poemWords);
      await poemsRepo.postPoem(string);
      return { message: 'Poem posted successfully', words: poemWords };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  servePoems,
  postPoem,
};
