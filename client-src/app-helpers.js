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

module.exports = {
  randomize,
  randomInt,
  setSeveralAttributes,
};
