console.log("File is loaded");
const wordPalette = document.getElementById("word-palette");
const composedPoem = document.getElementById("composed-poem");
const submitBtn = document.getElementById("submit-poem-btn");

const submitPoem = () => {
  let poemString = "";
  for (let word of composedPoem.children) {
    poemString += " " + word.innerText;
  }
  poemString = poemString.slice(1);

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
  composedPoem.appendChild(poemWordBtn);
};

const removeWord = button => {
  const correspondingAddButton = document.getElementById(
    button.innerText + "-add"
  );
  correspondingAddButton.removeAttribute("disabled");
  composedPoem.removeChild(button);
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
