const domActions = require('./dom-actions');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return label => {
    const newClone = domTemplate.content.cloneNode(true);
    const span = newClone.querySelector(`.${template.h3Class} span`);
    domActions.addTextNode(span, label);
    return newClone.children[0];
  }
}