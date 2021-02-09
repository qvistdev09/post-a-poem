const templatesInfo = require('../shared/sharedHtmlVariables.json');

const fetcher = require('./client-fetcher/').create('/api/', 'words', 'poems');

const elementsMaker = require('./elements-maker').create(templatesInfo);

const clientService = require('./client-service/').create(
  'word-palette',
  'composed-poem',
  'submitted-poems',
  fetcher,
  templatesInfo,
  elementsMaker
);

const submitBtn = document.getElementById('submit-poem-btn');
submitBtn.addEventListener('click', () => {
  clientService.submitPoem();
});

clientService.generatePalette();
clientService.renderPoems();
clientService.connectListeners();
