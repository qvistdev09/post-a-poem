const dataBetweenParentheses = /(?<=\()[^\(\)]+(?=\))/;

class ClientEncoder {
  constructor(composedPoemDiv, templatesInfo) {
    this.composedPoemDiv = document.getElementById(composedPoemDiv);
    this.templatesInfo = templatesInfo;
  }

  getRowMargin(element) {
    return `<${element.style.marginLeft.replace('rem', '')}>`;
  }

  getConnectorLength(element) {
    const connector = element.querySelector(`.${this.templatesInfo.addedWordBtn.connectorDivClass}`);
    return connector.style.width.replace('rem', '');
  }

  getHeight(element) {
    return element.style.transform.match(dataBetweenParentheses)[0].replace('%', '');
  }

  getWord(element) {
    return element.querySelector('button').getAttribute('data-word');
  }

  encodePoem() {
    let encodedPoem = '';
    const poemRows = [...this.composedPoemDiv.getElementsByClassName(this.templatesInfo.poemRow.divClass)];
    poemRows.forEach(row => {
      encodedPoem += this.getRowMargin(row);
      [...row.children].forEach(child => {
        const connector = this.getConnectorLength(child);
        const height = this.getHeight(child);
        const word = this.getWord(child);
        encodedPoem += `{${connector};${height};${word}}`;
      });
    });
    return encodedPoem;
  }
}

module.exports.create = (composedPoemDiv, templatesInfo) => new ClientEncoder(composedPoemDiv, templatesInfo);
