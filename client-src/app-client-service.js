const { createElementsMaker } = require('./app-elements-maker');

class ClientService {
  constructor(
    paletteDiv,
    composedPoemDiv,
    submittedPoemsDiv,
    fetcher,
    templates
  ) {
    this.paletteDiv = document.getElementById(paletteDiv);
    this.composedPoemDiv = document.getElementById(composedPoemDiv);
    this.submittedPoemsDiv = document.getElementById(submittedPoemsDiv);
    this.fetcher = fetcher;
    this.templates = templates;
    this.maker = createElementsMaker(templates);

    this.paletteDiv.addEventListener('click', e => {
      this.handleClick(e);
    });

    this.composedPoemDiv.addEventListener('click', e => {
      this.handleClick(e);
    });
  }
  clearContainer(element) {
    [...element.children].forEach(child => {
      element.removeChild(child);
    });
  }
  handleClick(e) {
    const targetClass = e.target.getAttribute('class');
    if (targetClass === this.templates.paletteBtn.class) {
      this.addWord(e.target);
    } else if (targetClass === this.templates.addedWordBtn.buttonClass) {
      this.removeWord(e.target);
    }
  }
  renderPoems() {
    this.clearContainer(this.submittedPoemsDiv);
    this.fetcher.getPoems((err, data) => {
      if (err) {
        console.log('Error getting poems');
      } else {
        for (let poem of data) {
          const newPoem = this.maker.submittedPoem(poem);
          this.submittedPoemsDiv.appendChild(newPoem);
        }
      }
    });
  }
  generatePalette() {
    this.clearContainer(this.paletteDiv);
    this.fetcher.getWords((err, data) => {
      if (err) {
        console.log('Failed getting words');
      } else {
        for (const word of data) {
          const newPaletteBtn = this.maker.paletteBtn(word);
          this.paletteDiv.appendChild(newPaletteBtn);
        }
      }
    });
  }
  encodePoem() {
    let encodedPoem = '';
    const poemRows = [
      ...this.composedPoemDiv.getElementsByClassName(
        this.templates.poemRow.divClass
      ),
    ];
    poemRows.forEach(row => {
      encodedPoem += `<${row.style.marginLeft.replace('rem', '')}>`;
      [...row.children].forEach(child => {
        const connector = child
          .querySelector(`.${this.templates.addedWordBtn.connectorDivClass}`)
          .style.width.replace('rem', '');
        const height = child.style.transform
          .match(/(?<=\()[^\(\)]+(?=\))/)[0]
          .replace('%', '');
        const word = child.querySelector('button').getAttribute('data-word');
        encodedPoem += `{${connector};${height};${word}}`;
      });
    });
    return encodedPoem;
  }
  submitPoem() {
    const encodedPoem = this.encodePoem();
    this.fetcher.submitPoem(encodedPoem, (err, data) => {
      this.clearContainer(this.submittedPoemsDiv);
      this.clearContainer(this.composedPoemDiv);
      this.renderPoems();
      this.generatePalette();
    });
  }
  getAvailableRow() {
    const poemRows = this.composedPoemDiv.getElementsByClassName(
      this.templates.poemRow.divClass
    );
    for (let row of poemRows) {
      if (row.children.length < 3) {
        return row;
      }
    }
    return null;
  }
  addWord(button) {
    button.setAttribute('disabled', 'true');
    const addedWord = this.maker.addedWordBtn(button.textContent);
    const availableRow = this.getAvailableRow();
    if (availableRow !== null) {
      availableRow.appendChild(addedWord);
    } else {
      const newRow = this.maker.poemRow();
      newRow.appendChild(addedWord);
      this.composedPoemDiv.appendChild(newRow);
    }
  }
  removeWord(button) {
    const correspondingAddButton = document.getElementById(
      button.getAttribute('data-word') + this.templates.paletteBtn.suffix
    );
    correspondingAddButton.removeAttribute('disabled');
    const currentRow = button.closest(`.${this.templates.poemRow.divClass}`);
    if (currentRow.children.length === 1) {
      currentRow.parentElement.removeChild(currentRow);
    } else {
      currentRow.removeChild(button.parentElement);
    }
  }
}

module.exports.create = (
  paletteDiv,
  composedPoemDiv,
  submittedPoemsDiv,
  fetcher,
  templates
) =>
  new ClientService(
    paletteDiv,
    composedPoemDiv,
    submittedPoemsDiv,
    fetcher,
    templates
  );
