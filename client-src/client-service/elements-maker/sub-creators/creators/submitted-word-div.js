const domActions = require('./helpers/dom-actions');

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
    domActions.addTextNode(paragraph, word);
    return newClone.children[0];
  };
};
