const { make } = require("./app-content");

function AppManager(paletteDiv, poemDiv) {
  this.paletteDiv = paletteDiv;
  this.poemDiv = poemDiv;
}

AppManager.prototype.addWord = function (button) {
  button.setAttribute("disabled", "true");
  const poemWordBtn = make.poemWordBtn(button.innerText);
  const poemRows = this.poemDiv.getElementsByClassName("poem-row");

  for (let row of poemRows) {
    if (row.children.length < 3) {
      row.appendChild(poemWordBtn);
      return;
    }
  }
  const newRow = make.newRow();
  this.poemDiv.appendChild(newRow);
  newRow.appendChild(poemWordBtn);
};

AppManager.prototype.removeWord = function (button) {
  const correspondingAddButton = document.getElementById(
    button.getAttribute("data-word") + "-add"
  );
  correspondingAddButton.removeAttribute("disabled");

  const currentRow = button.parentElement.parentElement;

  if (currentRow.children.length === 1) {
    currentRow.parentElement.removeChild(currentRow);
  } else {
    currentRow.removeChild(button.parentElement);
  }
};

AppManager.prototype.generatePalette = function (wordArray) {
  for (let word of wordArray) {
    const paletteBtn = make.poemPaletteBtn(word);
    this.paletteDiv.appendChild(paletteBtn);
  }
};

AppManager.prototype.submitPoem = function () {
  const wordArray = [];
  for (let poemWord of document.getElementsByClassName("poem-word")) {
    wordArray.push(poemWord.innerText);
  }
  const poemString = wordArray.join(" ");

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poem: poemString }),
  }).then(() => {
    window.location.href = "/";
  });
};

module.exports.create = (paletteDiv, poemDiv) =>
  new AppManager(paletteDiv, poemDiv);
