// interacts with poems db, gets poems and posts new ones
const database = require('../../database');
const { Poem } = database.models;

const getPoems = () => Poem.findAll({ order: [['createdAt', 'DESC']] });

const postPoem = string => Poem.create({ content: string });

module.exports = {
  getPoems,
  postPoem,
};
