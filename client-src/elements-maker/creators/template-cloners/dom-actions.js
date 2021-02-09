const randomize = (max, floor) => {
  const randomizationMultiplier = Math.floor(Math.random() * 101) / 100;
  const randomizedValue =
    max * randomizationMultiplier < floor
      ? floor
      : max * randomizationMultiplier;
  return randomizedValue;
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const setSeveralAttributes = (element, attributesObject) => {
  Object.keys(attributesObject).forEach(key => {
    element.setAttribute(key, attributesObject[key]);
  });
};

const setRandomHeight = (element, min, max) => {
  const randomizedHeight = randomInt(min, max);
  element.style.transform = `translateY(${randomizedHeight}%)`;
};

const setRandomWidth = (element, max, floor) => {
  const randomizedWidth = randomize(max, floor);
  element.style.width = `${randomizedWidth}rem`;
};

const addTextNode = (element, string) => {
  const textNode = document.createTextNode(string);
  element.appendChild(textNode);
};

const formatDate = dateString => {
  const dateObj = new Date(dateString);
  const formattedDate =
    dateObj.getDate() +
    '-' +
    (dateObj.getMonth() + 1) +
    '-' +
    dateObj.getFullYear() +
    ' ' +
    dateObj.getHours() +
    ':' +
    (dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes());
    return formattedDate;
};

module.exports = {
  randomize,
  randomInt,
  setSeveralAttributes,
  setRandomHeight,
  addTextNode,
  setRandomWidth,
  formatDate,
};
