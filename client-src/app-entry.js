const paletteDiv = document.getElementById("word-palette");
const poemDiv = document.getElementById("composed-poem");
const submitBtn = document.getElementById("submit-poem-btn");
const paletteWords = require('./dev-words.json');



const appGenerator = require('./app-generator').create(paletteDiv, poemDiv);

submitBtn.addEventListener("click", appGenerator.submitPoem);

appGenerator.generatePalette(paletteWords);

window.addWord = (word) => {appGenerator.addWord(word)};
window.removeWord = (word) => {appGenerator.removeWord(word)};


