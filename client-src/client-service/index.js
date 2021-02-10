class ClientService {
  constructor(paletteDiv, composedPoemDiv, submittedPoemsDiv, tools, templatesInfo) {
    this.paletteDiv = document.getElementById(paletteDiv);
    this.composedPoemDiv = document.getElementById(composedPoemDiv);
    this.submittedPoemsDiv = document.getElementById(submittedPoemsDiv);
    this.fetcher = tools.fetcher;
    this.maker = tools.maker;
    this.encoder = tools.encoder;
    this.templatesInfo = templatesInfo;
  }

  connectListeners() {
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
    if (targetClass === this.templatesInfo.paletteBtn.class) {
      this.addWord(e.target);
    } else if (targetClass === this.templatesInfo.addedWordBtn.buttonClass) {
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

  submitPoem() {
    const encodedPoem = this.encoder.encodePoem();
    this.fetcher.submitPoem(encodedPoem, (err, data) => {
      this.clearContainer(this.submittedPoemsDiv);
      this.clearContainer(this.composedPoemDiv);
      this.renderPoems();
      this.generatePalette();
    });
  }

  getAvailableRow() {
    const poemRows = this.composedPoemDiv.getElementsByClassName(this.templatesInfo.poemRow.divClass);
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
      button.getAttribute('data-word') + this.templatesInfo.paletteBtn.suffix
    );
    correspondingAddButton.removeAttribute('disabled');
    const currentRow = button.closest(`.${this.templatesInfo.poemRow.divClass}`);
    if (currentRow.children.length === 1) {
      currentRow.parentElement.removeChild(currentRow);
    } else {
      currentRow.removeChild(button.parentElement);
    }
  }
}

module.exports.create = (paletteDiv, composedPoemDiv, submittedPoemsDiv, tools, templatesInfo) =>
  new ClientService(paletteDiv, composedPoemDiv, submittedPoemsDiv, tools, templatesInfo);
