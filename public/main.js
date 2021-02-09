/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { createElementsMaker } = __webpack_require__(622);

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


/***/ }),

/***/ 622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const subCreators = __webpack_require__(801);

const createElementsMaker = sharedHtmlVariables => {
  const addedWordBtn = subCreators.addedWordBtn(
    sharedHtmlVariables.addedWordBtn
  );
  const paletteBtn = subCreators.paletteBtn(sharedHtmlVariables.paletteBtn);
  const poemRow = subCreators.poemRow(sharedHtmlVariables.poemRow);
  const submittedPoemContainer = subCreators.submittedPoemContainer(
    sharedHtmlVariables.submittedPoemContainer
  );
  const submittedWordDiv = subCreators.submittedWordDiv(
    sharedHtmlVariables.submittedWordDiv
  );
  const submittedPoem = subCreators.submittedPoem(
    submittedPoemContainer,
    poemRow,
    submittedWordDiv,
    sharedHtmlVariables
  );
  return {
    addedWordBtn,
    paletteBtn,
    poemRow,
    submittedPoemContainer,
    submittedWordDiv,
    submittedPoem,
  };
};

module.exports = {
  createElementsMaker,
};


/***/ }),

/***/ 475:
/***/ ((module) => {

class Fetcher {
  constructor(basepath, words, poems, submit) {
    this.words = basepath + words;
    this.poems = basepath + poems;
    this.submit = basepath + submit;
  }
  genericFetch(path, callback) {
    fetch(path)
      .then(res => res.json())
      .then(data => {
        callback(null, data);
      })
      .catch(error => {
        callback(error, null);
      });
  }

  getWords(callback) {
    this.genericFetch(this.words, callback);
  }
  getPoems(callback) {
    fetch(this.poems)
    .then(res => res.json())
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      throw error;
      callback(error, null);
    });
  }
  submitPoem(poem, callback) {
    fetch(this.submit, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: poem }),
    })
      .then(res => res.json())
      .then(data => {
        callback(null, data);
      })
      .catch(error => {
        callback(error, null);
      });
  }
}

module.exports.create = (basepath, words, poems, submit) =>
  new Fetcher(basepath, words, poems, submit);


/***/ }),

/***/ 185:
/***/ ((module) => {

const randomize = (max, floor) => {
  const randomizationMultiplier = Math.floor(Math.random() * 101) / 100;
  const randomizedValue =
    max * randomizationMultiplier < floor
      ? floor
      : max * randomizationMultiplier;
  return randomizedValue;
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const setSeveralAttributes = (element, attributesObject) => {
  Object.keys(attributesObject).forEach(key => {
    element.setAttribute(key, attributesObject[key]);
  });
};

const setRandomHeight = (element, min, max) => {
  const randomizedHeight = randomInt(min, max);
  element.style.transform = `translateY(${randomizedHeight}%)`;
};

const setRandomWidth = (element, max, floor) => {
  const randomizedWidth = randomize(max, floor);
  element.style.width = `${randomizedWidth}rem`;
};

const addTextNode = (element, string) => {
  const textNode = document.createTextNode(string);
  element.appendChild(textNode);
};

const formatDate = dateString => {
  const dateObj = new Date(dateString);
  console.log(typeof dateObj.getMinutes());
  const formattedDate =
    dateObj.getDate() +
    '-' +
    (dateObj.getMonth() + 1) +
    '-' +
    dateObj.getFullYear() +
    ' ' +
    dateObj.getHours() +
    ':' +
    (dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes());
    return formattedDate;
};

module.exports = {
  randomize,
  randomInt,
  setSeveralAttributes,
  setRandomHeight,
  addTextNode,
  setRandomWidth,
  formatDate,
};


/***/ }),

/***/ 805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const containerDiv = newClone.querySelector(
      `.${template.containerDivClass}`
    );
    const button = newClone.querySelector(`.${template.buttonClass}`);
    const connectorDiv = newClone.querySelector(
      `.${template.connectorDivClass}`
    );
    helpers.setRandomHeight(containerDiv, -15, 15);
    helpers.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    helpers.addTextNode(button, word);
    helpers.setRandomWidth(connectorDiv, 4, 0.8);
    return newClone.children[0];
  };
};


/***/ }),

/***/ 959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const button = newClone.querySelector(`.${template.class}`);
    helpers.addTextNode(button, word);
    helpers.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    return newClone.children[0];
  };
};


/***/ }),

/***/ 976:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return margin => {
    const rowMargin = margin ? margin : helpers.randomize(5, 0);
    const newClone = domTemplate.content.cloneNode(true);
    const div = newClone.querySelector(`.${template.divClass}`);
    div.style.marginLeft = `${rowMargin}rem`;
    return newClone.children[0];
  };
};


/***/ }),

/***/ 795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return label => {
    const newClone = domTemplate.content.cloneNode(true);
    const span = newClone.querySelector(`.${template.h3Class} span`);
    helpers.addTextNode(span, label);
    return newClone.children[0];
  }
}

/***/ }),

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = (containerMaker, rowMaker, wordMaker, templates) => obj => {
  const formattedDate = helpers.formatDate(obj.created);
  const entirePoemContainer = containerMaker(formattedDate);
  const rowsContainer = entirePoemContainer.querySelector(
    `.${templates.submittedPoemContainer.innerDivClass}`
  );
  for (let row of obj.rows) {
    const newRow = rowMaker(row.margin);
    for (let word of row.words) {
      const newWord = wordMaker(word.word, word.connector, word.height);
      newRow.appendChild(newWord);
    }
    rowsContainer.appendChild(newRow);
  }
  return entirePoemContainer;
};


/***/ }),

/***/ 163:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const helpers = __webpack_require__(185);

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return (word, connectorLength, height) => {
    const newClone = domTemplate.content.cloneNode(true);
    const div = newClone.querySelector(`.${template.divClass}`);
    div.style.transform = `translateY(${height}%)`;
    const connectorDiv = newClone.querySelector(
      `.${template.connectorDivClass}`
    );
    connectorDiv.style.width = `${connectorLength}rem`;
    const paragraph = newClone.querySelector(
      `.${template.innerParagraphClass}`
    );
    helpers.addTextNode(paragraph, word);
    return newClone.children[0];
  };
};


/***/ }),

/***/ 801:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  addedWordBtn: __webpack_require__(805),
  paletteBtn: __webpack_require__(959),
  poemRow: __webpack_require__(976),
  submittedPoemContainer: __webpack_require__(795),
  submittedWordDiv: __webpack_require__(163),
  submittedPoem: __webpack_require__(214),
};


/***/ }),

/***/ 180:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"paletteBtn\":{\"templateId\":\"palette-btn-template\",\"class\":\"palette-btn\",\"suffix\":\"-add\"},\"addedWordBtn\":{\"templateId\":\"added-word-btn-template\",\"containerDivClass\":\"added-word-btn-container-div\",\"connectorDivClass\":\"connector-div\",\"buttonClass\":\"added-word-btn\",\"closeIconClass\":\"added-word-btn-close-icon\",\"suffix\":\"-rm\"},\"poemRow\":{\"templateId\":\"poem-row-template\",\"divClass\":\"poem-row-div\"},\"submittedPoemContainer\":{\"templateId\":\"submitted-poem-container-template\",\"divClass\":\"submitted-poem-container-div\",\"h3Class\":\"label\",\"innerDivClass\":\"labelled-container\"},\"submittedWordDiv\":{\"templateId\":\"submitted-word-div-template\",\"divClass\":\"submitted-word-div\",\"connectorDivClass\":\"connector-div\",\"innerParagraphClass\":\"submitted-word\"}}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
const fetcher = __webpack_require__(475).create(
  '/api/',
  'words',
  'poems',
  'poems'
);

const templates = __webpack_require__(180);

const clientService = __webpack_require__(814).create(
  'word-palette',
  'composed-poem',
  'submitted-poems',
  fetcher,
  templates
);

const submitBtn = document.getElementById('submit-poem-btn');
submitBtn.addEventListener('click', () => {
  clientService.submitPoem();
});

clientService.generatePalette();
clientService.renderPoems();

})();

/******/ })()
;