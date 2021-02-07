// validates encoded poem string
const okDigit =
  '(-{0,1}((0\\.[0-9]+)|([1-9][0-9]*\\.[0-9]+)|([1-9][0-9]*)|(0)))'; // refuse bad digits, e.g. "0.", "00", ".", "00.15".
const okWord = '([a-z]+)';
const wordExtractorRegex = /(?<=;)[a-z]+(?=})/g;
const validationRegex = new RegExp(
  `^(<${okDigit}>({${okDigit};${okDigit};${okWord}}){1,3}){1,4}$`
);

const validFormat = string => validationRegex.test(string);

const extractWords = string => string.match(wordExtractorRegex);

const validWordCount = string => {
  const requiredWords = 3;
  const extractedWords = extractWords(string).length;
  return extractedWords >= requiredWords;
};

const formatIsValid = string => {
  if (!validFormat(string)) {
    throw new Error('Invalid poem format.');
  }
  if (!validWordCount(string)) {
    throw new Error('Not enough words in poem');
  }
  return true;
};

module.exports = {
  formatIsValid,
  extractWords,
};
