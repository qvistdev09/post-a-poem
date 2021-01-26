const randomize = (max, floor) => {
  const randomizationMultiplier = Math.floor(Math.random() * 101) / 100;
  const randomizedValue =
    max * randomizationMultiplier < floor
      ? floor
      : max * randomizationMultiplier;
  return randomizedValue;
};

module.exports.randomize = randomize;
