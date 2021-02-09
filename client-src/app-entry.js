const fetcher = require('./app-fetcher').create(
  '/api/',
  'words',
  'poems',
  'poems'
);

const templates = require('../shared/sharedHtmlVariables.json');

const clientService = require('./app-client-service').create(
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
