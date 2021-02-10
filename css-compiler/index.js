const templatesInfo = require('../shared/sharedHtmlVariables.json');
const fs = require('fs');

const compileCss = () => {
  fs.readFile('./css-src/style.css', (err, data) => {
    if (err) {
      return console.log('Problem reading source CSS file');
    }
    let stringifiedData = data.toString();
    const mainKeys = Object.keys(templatesInfo);
    for (const bigKey of mainKeys) {
      const subKeys = Object.keys(templatesInfo[bigKey]);
      for (const smallKey of subKeys) {
        const target = new RegExp(`${bigKey}-${smallKey}`, 'g');
        stringifiedData = stringifiedData.replace(target, templatesInfo[bigKey][smallKey]);
      }
    }
    fs.writeFile('./public/compiled-style.css', stringifiedData, err => {
      if (err) {
        return console.log(err.message);
      }
      console.log('CSS file compiled');
    });
  });
};

module.exports = compileCss;
