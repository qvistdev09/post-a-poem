const templatesInfo = require('../shared/sharedHtmlVariables.json');

const fetcher = require('./client-fetcher/').create('/api/', 'words', 'poems');
const maker = require('./elements-maker').create(templatesInfo);
const encoder = require('./client-encoder').create('composed-poem', templatesInfo);

const clientService = require('./client-service/').create(
  'word-palette',
  'composed-poem',
  'submitted-poems',
  {
    fetcher,
    maker,
    encoder
  },
  templatesInfo
);

const submitBtn = document.getElementById('submit-poem-btn');
submitBtn.addEventListener('click', () => {
  clientService.submitPoem();
});

clientService.generatePalette();
clientService.renderPoems();
clientService.connectListeners();
