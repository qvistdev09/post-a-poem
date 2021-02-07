const helpers = require('../../app-helpers');

module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return margin => {
    const rowMargin = margin ? margin : helpers.randomize(5, 0);
    const newClone = domTemplate.content.cloneNode(true);
    const div = newClone.querySelector(`.${template.divClass}`);
    div.style.marginLeft = `${rowMargin}rem`;
    return newClone;
  };
};
