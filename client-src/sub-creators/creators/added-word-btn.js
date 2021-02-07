const helpers = require('../../app-helpers');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const containerDiv = newClone.querySelector(
      `.${template.containerDivClass}`
    );
    const randomHeight = helpers.randomize(-15, 15);
    containerDiv.style.transform = `translateY(${randomHeight}%)`;
    const button = newClone.querySelector(`.${template.buttonClass}`);
    helpers.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    button.textContent = word;
    const connectorWidth = helpers.randomize(4, 0.8);
    const connectorDiv = newClone.querySelector(
      `.${template.connectorDivClass}`
    );
    connectorDiv.style.width = `${connectorWidth}rem`;
    return newClone;
  };
};
