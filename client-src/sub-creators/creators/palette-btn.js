const helpers = require('../../app-helpers');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return word => {
    const newClone = domTemplate.content.cloneNode(true);
    const button = newClone.querySelector(`.${template.class}`);
    helpers.addTextNode(button, word);
    helpers.setSeveralAttributes(button, {
      id: word + template.suffix,
      'data-word': word,
    });
    return newClone.children[0];
  };
};
