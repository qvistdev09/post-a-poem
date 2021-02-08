const helpers = require('../../app-helpers');

module.exports = (containerMaker, rowMaker, wordMaker, templates) => obj => {
  const formattedDate = helpers.formatDate(obj.created);
  const entirePoemContainer = containerMaker(formattedDate);
  const rowsContainer = entirePoemContainer.querySelector(
    `.${templates.submittedPoemContainer.innerDivClass}`
  );
  for (let row of obj.rows) {
    const newRow = rowMaker(row.margin);
    for (let word of row) {
      const newWord = wordMaker(word.word, word.connector, word.height);
      newRow.appendChild(newWord);
    }
    rowsContainer.appendChild(newRow);
  }
  return entirePoemContainer;
};
