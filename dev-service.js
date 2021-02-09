const database = require('./database');
const { Poem, Word } = database.models;

const samplePoems = require('./sample-data/sample-poems.json');
const sampleWords = require('./sample-data/sample-words.json');

const syncAndPopulate = async () => {
  await database.sequelize.sync({ force: true });
  samplePoems.forEach(async entry => {
    await Poem.create({ content: entry });
  });
  sampleWords.forEach(async entry => {
    await Word.create({ content: entry });
  });
};

module.exports = {
  syncAndPopulate,
};
