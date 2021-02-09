const helpers = require('../../app-helpers');

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
    helpers.setRandomHeight(containerDiv, -15, 15);
    helpers.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    helpers.addTextNode(button, word);
    helpers.setRandomWidth(connectorDiv, 4, 0.8);
    return newClone.children[0];
  };
};
