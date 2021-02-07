const paletteDiv = document.getElementById("word-palette");
const poemDiv = document.getElementById("composed-poem");
const submittedPoemsDiv = document.getElementById("submitted-poems");
const submitBtn = document.getElementById("submit-poem-btn");

const manager = require("./app-manager").create(
  paletteDiv,
  poemDiv,
  submittedPoemsDiv
);

submitBtn.addEventListener("click", () => {
  manager.submitPoem();
});

manager.renderSubmittedPoems();

window.addWord = word => {
  manager.addWord(word);
};
window.removeWord = word => {
  manager.removeWord(word);
};
