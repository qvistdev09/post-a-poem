// interacts with words db, gets random words and confirms allowed words
const database = require('../../database');
const { Word } = database.models;

const checkWord = word => {
  return Word.findOne({ where: { content: word } });
};

const getRandomWords = () =>
  Word.findAll({
    order: database.Sequelize.literal('random()'),
    limit: 10,
  });

module.exports = {
  checkWord,
  getRandomWords,
};
