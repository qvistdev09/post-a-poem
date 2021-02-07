const subCreators = require('./sub-creators');

const createElementsMaker = sharedHtmlVariables => {
  return {
    addedWordBtn: subCreators.addedWordBtn(sharedHtmlVariables.addedWordBtn),
    paletteBtn: subCreators.paletteBtn(sharedHtmlVariables.paletteBtn),
    poemRow: subCreators.poemRow(sharedHtmlVariables.poemRow),
    submittedPoemContainer: subCreators.submittedPoemContainer(
      sharedHtmlVariables.submittedPoemContainer
    ),
    submittedWordDiv: subCreators.submittedWordDiv(
      sharedHtmlVariables.submittedWordDiv
    ),
  };
};

module.exports = {
  createElementsMaker,
};
