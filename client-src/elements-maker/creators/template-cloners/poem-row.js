const domActions = require('./dom-actions');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return margin => {
    const rowMargin = margin ? margin : domActions.randomize(5, 0);
    const newClone = domTemplate.content.cloneNode(true);
    const div = newClone.querySelector(`.${template.divClass}`);
    div.style.marginLeft = `${rowMargin}rem`;
    return newClone.children[0];
  };
};
