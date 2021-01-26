const helpers = {
  randomize: (max, floor) => {
    const randomizationMultiplier = Math.floor(Math.random() * 101) / 100;
    const randomizedValue =
      max * randomizationMultiplier < floor
        ? floor
        : max * randomizationMultiplier;
    return randomizedValue;
  },
  randomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

module.exports.helpers = helpers;
