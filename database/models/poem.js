const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Poem extends Sequelize.Model {}
  Poem.init({
    content: Sequelize.STRING,
  }, { sequelize });

  return Poem;
};