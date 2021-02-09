const domActions = require('./dom-actions');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const containerDiv = newClone.querySelector(
      `.${template.containerDivClass}`
    );
    const button = newClone.querySelector(`.${template.buttonClass}`);
    const connectorDiv = newClone.querySelector(
      `.${template.connectorDivClass}`
    );
    domActions.setRandomHeight(containerDiv, -15, 15);
    domActions.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    domActions.addTextNode(button, word);
    domActions.setRandomWidth(connectorDiv, 4, 0.8);
    return newClone.children[0];
  };
};
