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
    this.genericFetch(this.poems, callback);
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
