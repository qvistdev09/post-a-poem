const subCreators = require('./sub-creators/index');

const createElementsMaker = sharedHtmlVariables => {
  const addedWordBtn = subCreators.addedWordBtn(
    sharedHtmlVariables.addedWordBtn
  );
  const paletteBtn = subCreators.paletteBtn(sharedHtmlVariables.paletteBtn);
  const poemRow = subCreators.poemRow(sharedHtmlVariables.poemRow);
  const submittedPoemContainer = subCreators.submittedPoemContainer(
    sharedHtmlVariables.submittedPoemContainer
  );
  const submittedWordDiv = subCreators.submittedWordDiv(
    sharedHtmlVariables.submittedWordDiv
  );
  const submittedPoem = subCreators.submittedPoem(
    submittedPoemContainer,
    poemRow,
    submittedWordDiv
  );
  return {
    addedWordBtn,
    paletteBtn,
    poemRow,
    submittedPoemContainer,
    submittedWordDiv,
    submittedPoem,
  };
};

module.exports = {
  createElementsMaker,
};
