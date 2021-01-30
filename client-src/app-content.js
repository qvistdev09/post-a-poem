const { helpers } = require("./app-helpers");

const make = {
  poemWordBtn: word => {
    const container = document.createElement("div");
    container.setAttribute("class", "word-div");
    container.style.transform = `translateY(${helpers.randomInt(-15, 15)}%)`;

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
    connectorDiv.style.width = `${helpers.randomize(4, 0.8)}rem`;

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
    newRow.style.marginLeft = `${helpers.randomize(5, 0)}rem`;
    return newRow;
  },
  submittedPoem: parsedPoemObj => {
    // container
    const container = document.createElement("div");
    container.setAttribute("class", "submitted-poem-container");

    // label
    const label = document.createElement("h3");
    label.setAttribute("class", "label");
    const dateObj = new Date(parsedPoemObj.created);
    const formattedDate =
      dateObj.getDate() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getFullYear() +
      " " +
      dateObj.getHours() +
      ":" +
      dateObj.getMinutes();
    const span = document.createElement('span');
    span.textContent = formattedDate;
    label.appendChild(span);
    container.appendChild(label);

    // labelled container
    const labelledContainer = document.createElement("div");
    labelledContainer.setAttribute("class", "labelled-container");
    container.appendChild(labelledContainer);

    // rows
    parsedPoemObj.rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.setAttribute("class", "poem-row");
      rowDiv.style.marginLeft = `${row.margin}rem`;
      row.words.forEach(word => {
        // word container
        const wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "word-div");
        wordDiv.style.transform = `translateY(${word.height}%)`;

        // connector
        const connector = document.createElement("div");
        connector.setAttribute("class", "connector-div");
        connector.style.width = `${word.connector}rem`;
        wordDiv.appendChild(connector);

        // p element with poem word
        const wordParagraph = document.createElement("p");
        wordParagraph.setAttribute("class", "poem-word");
        wordParagraph.textContent = word.word;
        wordDiv.appendChild(wordParagraph);

        // append into row
        rowDiv.appendChild(wordDiv);
      });
      labelledContainer.appendChild(rowDiv);
    });
    return container;
  },
};

module.exports.make = make;
