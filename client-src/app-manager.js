const { make } = require("./app-content");

function AppManager(paletteDiv, poemDiv, submittedPoemsDiv) {
  this.paletteDiv = paletteDiv;
  this.poemDiv = poemDiv;
  this.submittedPoemsDiv = submittedPoemsDiv;
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
  [...this.paletteDiv.children].forEach(child => {
    this.paletteDiv.removeChild(child);
  });

  fetch("/api/words")
    .then(data => data.json())
    .then(json => {
      for (let word of json) {
        const paletteBtn = make.poemPaletteBtn(word);
        this.paletteDiv.appendChild(paletteBtn);
      }
    });
};

AppManager.prototype.submitPoem = function () {
  // to-do: validate poem (enough words, rows, etc)
  let encodedPoem = "";
  const poemRows = [...this.poemDiv.getElementsByClassName("poem-row")];

  poemRows.forEach(row => {
    encodedPoem += `<${row.style.marginLeft.replace("rem", "")}>`;

    [...row.children].forEach(child => {
      const connector = child
        .querySelector(".connector-div")
        .style.width.replace("rem", "");
      const height = child.style.transform
        .match(/(?<=\()[^\(\)]+(?=\))/)[0]
        .replace("%", "");
      const word = child.querySelector("button").getAttribute("data-word");
      encodedPoem += `{${connector};${height};${word}}`;
    });
  });

  fetch("/api/poems", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: encodedPoem }),
  }).then(() => {
    window.location.href = "/";
  });
};

AppManager.prototype.renderSubmittedPoems = function () {
  [...this.submittedPoemsDiv.children].forEach(child => {
    this.submittedPoemsDiv.removeChild(child);
  });

  fetch("/api/poems")
    .then(data => data.json())
    .then(json => {
      json.forEach(poem => {
        const renderedPoem = make.submittedPoem(poem);
        this.submittedPoemsDiv.appendChild(renderedPoem);
      });
    });
};

module.exports.create = (paletteDiv, poemDiv, submittedPoemsDiv) =>
  new AppManager(paletteDiv, poemDiv, submittedPoemsDiv);
