const wordPalette = document.getElementById('word-palette');
const composedPoem = document.getElementById('composed-poem');
const submittedPoems = document.getElementById('submitted-poems');

const fetcher = require('./app-fetcher').create(
  '/api/',
  'words',
  'poems',
  'poems'
);

const templates = require('../shared/sharedHtmlVariables.json');
const elementsMaker = require('./app-elements-maker').createElementsMaker(templates);

// const clientService = require('./app-client-service').create(
//   wordPalette,
//   composedPoem,
//   submittedPoems,
//   fetcher,
//   templates
// );

// const submitBtn = document.getElementById('submit-poem-btn');
// submitBtn.addEventListener('click', () => {
//   clientService.submitPoem();
// });

// clientService.generatePalette();
// clientService.renderPoems();
