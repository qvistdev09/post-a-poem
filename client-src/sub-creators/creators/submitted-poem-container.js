module.exports = template => {
  const domTemplate = document.getElementById(template.templateId);
  return label => {
    const newClone = domTemplate.content.cloneNode(true);
    const span = newClone.querySelector(`.${template.h3Class} span`);
    span.textContent = label;
    return newClone;
  }
}