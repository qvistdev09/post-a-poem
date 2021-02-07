const wordsRepo = require('./words-repo');

const serveRandomWords = async () => {
  try {
    const databaseEntries = await wordsRepo.getRandomWords();
    const words = databaseEntries.map(entry => entry.content);
    return words;
  } catch (error) {
    throw error;
  }
};

const allAllowed = array => {
  return new Promise((resolve, reject) => {
    Promise.all(array.map(word => wordsRepo.checkWord(word)))
      .then(values => {
        if (values.some(value => value === null)) {
          reject(new Error('Non-allowed words'));
        } else {
          resolve(array);
        }
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  serveRandomWords,
  allAllowed,
};
