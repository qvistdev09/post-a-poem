const randomize = (max, floor) => {
  const randomizationMultiplier = Math.floor(Math.random() * 101) / 100;
  const randomizedValue =
    max * randomizationMultiplier < floor
      ? floor
      : max * randomizationMultiplier;
  return randomizedValue;
};

const makePoemWordBtn = word => {
  const container = document.createElement("div");
  container.setAttribute("class", "word-div");

  const poemWordBtn = document.createElement("button");
  poemWordBtn.setAttribute("onclick", "removeWord(this)");
  poemWordBtn.setAttribute("id", word + "-rm");
  poemWordBtn.setAttribute("class", "poem-word");
  poemWordBtn.innerText = word;

  const connectorDiv = document.createElement("div");
  connectorDiv.setAttribute("class", "connector-div");
  connectorDiv.style.width = `${randomize(4, 0.3)}rem`;

  container.appendChild(connectorDiv);
  container.appendChild(poemWordBtn);

  return container;
};

const makePoemPaletteBtn = word => {
  const paletteBtn = document.createElement("button");
  paletteBtn.innerText = word;
  paletteBtn.setAttribute("id", word + "-add");
  paletteBtn.setAttribute("onclick", "addWord(this)");
  return paletteBtn;
};

const makeNewRow = () => {
  const newRow = document.createElement("div");
  newRow.setAttribute("class", "poem-row");
  newRow.style.marginLeft = `${randomize(5, 0)}rem`;
  return newRow;
};

function AppGenerator(paletteDiv, poemDiv) {
  this.paletteDiv = paletteDiv;
  this.poemDiv = poemDiv;
}

AppGenerator.prototype.addWord = function (button) {
  button.setAttribute("disabled", "true");

  const poemWordBtn = makePoemWordBtn(button.innerText);

  const poemRows = this.poemDiv.getElementsByClassName("poem-row");

  if (poemRows.length === 0) {
    const newRow = makeNewRow();
    this.poemDiv.appendChild(newRow);
    newRow.appendChild(poemWordBtn);
  } else {
    for (let row of poemRows) {
      if (row.children.length < 3) {
        row.appendChild(poemWordBtn);
        return;
      }
    }
    const newRow = makeNewRow();
    this.poemDiv.appendChild(newRow);
    newRow.appendChild(poemWordBtn);
  }
};

AppGenerator.prototype.removeWord = function (button) {
  const correspondingAddButton = document.getElementById(
    button.innerText + "-add"
  );
  correspondingAddButton.removeAttribute("disabled");

  const currentRow = button.parentElement.parentElement;

  if (currentRow.children.length === 1) {
    currentRow.parentElement.removeChild(currentRow);
  } else {
    currentRow.removeChild(button.parentElement);
  }
};

AppGenerator.prototype.generatePalette = function (wordArray) {
  for (let word of wordArray) {
    const paletteBtn = makePoemPaletteBtn(word);
    this.paletteDiv.appendChild(paletteBtn);
  }
};

AppGenerator.prototype.submitPoem = function () {
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
  new AppGenerator(paletteDiv, poemDiv);
