const express = require('express');
const api = express.Router();
const poemsService = require('./poems/poems-service');
const wordsService = require('./words/words-service');

api.get('/poems', (req, res) => {
  poemsService
    .servePoems()
    .then(poems => {
      res.json(poems);
    })
    .catch(error => {
      errorResponse(res, error, 500);
    });
});

api.post('/poems', (req, res) => {
  const clientInput = req.body.input;
  if (!clientInput) {
    errorResponse(res, { message: 'Empty input' }, 400);
  } else {
    poemsService
      .postPoem(clientInput)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        errorResponse(res, error, 400);
      });
  }
});

api.get('/words', (req, res) => {
  wordsService
    .serveRandomWords()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      errorResponse(res, error, 500);
    });
});

const errorResponse = (res, error, statusCode) => {
  res.statusCode = statusCode;
  res.json({ error: error.message });
};

module.exports = api;
