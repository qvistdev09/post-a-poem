const { randomize } = require('./app-functions');

const make = {
  poemWordBtn: word => {
    const container = document.createElement("div");
    container.setAttribute("class", "word-div");

    const poemWordBtn = document.createElement("button");
    poemWordBtn.setAttribute("onclick", "removeWord(this)");
    poemWordBtn.setAttribute("id", word + "-rm");
    poemWordBtn.setAttribute("class", "poem-word");
    poemWordBtn.setAttribute("data-word", word);
    poemWordBtn.textContent = word;

    const closeIcon = document.createElement("p");
    closeIcon.setAttribute("class", "close-icon");
    closeIcon.textContent = "X";
    poemWordBtn.appendChild(closeIcon);

    const connectorDiv = document.createElement("div");
    connectorDiv.setAttribute("class", "connector-div");
    connectorDiv.style.width = `${randomize(4, 0.3)}rem`;

    container.appendChild(connectorDiv);
    container.appendChild(poemWordBtn);

    return container;
  },
  poemPaletteBtn: word => {
    const paletteBtn = document.createElement("button");
    paletteBtn.textContent = word;
    paletteBtn.setAttribute("id", word + "-add");
    paletteBtn.setAttribute("data-word", word);
    paletteBtn.setAttribute("class", "palette-btn");
    paletteBtn.setAttribute("onclick", "addWord(this)");
    return paletteBtn;
  },
  newRow: () => {
    const newRow = document.createElement("div");
    newRow.setAttribute("class", "poem-row");
    newRow.style.marginLeft = `${randomize(5, 0)}rem`;
    return newRow;
  },
};

module.exports.make = make;
