const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Word extends Sequelize.Model {}
  Word.init({
    content: Sequelize.STRING,
  }, { sequelize });

  return Word;
};