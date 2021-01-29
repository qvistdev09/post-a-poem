const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Poem = require('./models/poem.js')(sequelize);
db.models.Word = require('./models/word.js')(sequelize);

module.exports = db;