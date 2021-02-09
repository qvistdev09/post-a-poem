class Fetcher {
  constructor(basepath, words, poems) {
    this.words = basepath + words;
    this.poems = basepath + poems;
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
    fetch(this.poems, {
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

module.exports.create = (basepath, words, poems) =>
  new Fetcher(basepath, words, poems);
