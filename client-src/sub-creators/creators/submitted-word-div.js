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
    paragraph.textContent = word;
    return newClone;
  };
};
