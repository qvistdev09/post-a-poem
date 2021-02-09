const domActions = require('./helpers/dom-actions');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const button = newClone.querySelector(`.${template.class}`);
    domActions.addTextNode(button, word);
    domActions.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    return newClone.children[0];
  };
};
