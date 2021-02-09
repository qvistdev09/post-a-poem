const creators = require('./creators');

const create = templatesInfo => {
  const addedWordBtn = creators.addedWordBtn(templatesInfo.addedWordBtn);
  const paletteBtn = creators.paletteBtn(templatesInfo.paletteBtn);
  const poemRow = creators.poemRow(templatesInfo.poemRow);
  const submittedPoemContainer = creators.submittedPoemContainer(templatesInfo.submittedPoemContainer);
  const submittedWordDiv = creators.submittedWordDiv(templatesInfo.submittedWordDiv);
  const submittedPoem = creators.submittedPoem(submittedPoemContainer, poemRow, submittedWordDiv, templatesInfo);
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
  create,
};
