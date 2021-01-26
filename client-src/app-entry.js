const paletteDiv = document.getElementById("word-palette");
const poemDiv = document.getElementById("composed-poem");
const submitBtn = document.getElementById("submit-poem-btn");
const paletteWords = require('./dev-words.json');

const manager = require('./app-manager').create(paletteDiv, poemDiv);

submitBtn.addEventListener("click", manager.submitPoem);

manager.generatePalette(paletteWords);

window.addWord = (word) => {manager.addWord(word)};
window.removeWord = (word) => {manager.removeWord(word)};


