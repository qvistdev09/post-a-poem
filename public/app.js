console.log("File is loaded");
const wordPalette = document.getElementById("word-palette");
const composedPoem = document.getElementById("composed-poem");
const submitBtn = document.getElementById("submit-poem-btn");

const submitPoem = () => {
  const wordArray = [];
  for (let poemWord of document.getElementsByClassName('poem-word')) {
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

const addWord = button => {
  button.setAttribute("disabled", "true");

  const poemWordBtn = document.createElement("button");
  poemWordBtn.innerText = button.innerText;
  poemWordBtn.setAttribute("onclick", "removeWord(this)");
  poemWordBtn.setAttribute("id", button.innerText + "-rm");
  poemWordBtn.setAttribute("class", "poem-word");

  const poemRows = composedPoem.getElementsByClassName("poem-row");

  if (poemRows.length === 0) {
    const newRow = document.createElement("div");
    newRow.setAttribute("class", "poem-row");
    composedPoem.appendChild(newRow);
    newRow.appendChild(poemWordBtn);
  } else {
    for (let row of poemRows) {
      if (row.children.length < 3) {
        row.appendChild(poemWordBtn);
        return;
      }
    }
    const newRow = document.createElement("div");
    newRow.setAttribute("class", "poem-row");
    composedPoem.appendChild(newRow);
    newRow.appendChild(poemWordBtn);
  }
};

const removeWord = button => {
  const correspondingAddButton = document.getElementById(
    button.innerText + "-add"
  );
  correspondingAddButton.removeAttribute("disabled");

  if (button.parentElement.children.length === 1) {
    button.parentElement.parentElement.removeChild(button.parentElement);
  } else {
    button.parentElement.removeChild(button);
  }
};

submitBtn.addEventListener("click", submitPoem);

const paletteWords = [
  "silence",
  "potato",
  "is",
  "justice",
  "would",
  "alarmingly",
  "tremor",
  "warned",
  "in",
  "places",
];

for (let word of paletteWords) {
  const wordButton = document.createElement("button");
  wordButton.innerText = word;
  wordButton.setAttribute("id", word + "-add");
  wordButton.setAttribute("onclick", "addWord(this)");
  wordPalette.appendChild(wordButton);
}
