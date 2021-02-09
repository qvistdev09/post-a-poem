const domActions = require('./helpers/dom-actions');

module.exports = (containerMaker, rowMaker, wordMaker, templates) => obj => {
  const formattedDate = domActions.formatDate(obj.created);
  const entirePoemContainer = containerMaker(formattedDate);
  const rowsContainer = entirePoemContainer.querySelector(
    `.${templates.submittedPoemContainer.innerDivClass}`
  );
  for (let row of obj.rows) {
    const newRow = rowMaker(row.margin);
    for (let word of row.words) {
      const newWord = wordMaker(word.word, word.connector, word.height);
      newRow.appendChild(newWord);
    }
    rowsContainer.appendChild(newRow);
  }
  return entirePoemContainer;
};
