const okDigit = '(-{0,1}((0.[0-9]+)|([1-9][0-9]*.[0-9]+)|([1-9][0-9]*)|(0)))'; // refuse bad digits, e.g. "0.", "00", ".", "00.15".
const okWord = '([a-z]+)';
const wordExtractorRegex = /(?<=;)[a-z]+(?=})/g;
const validationRegex = new RegExp(
  `^(<${okDigit}>({${okDigit};${okDigit};${okWord}}){1,3}){1,4}$`
);

const wordAllowed = (table, word, resolve, reject) => {
  table.findOne({ where: { content: word } }).then(token => {
    if (token === null) {
      reject(new Error('Word not allowed'));
    } else {
      resolve(word);
    }
  });
};

const format = string => {
  if (validationRegex.test(string)) {
    return string;
  } else {
    throw new Error('Invalid poem format');
  }
};

const wordCount = validatedString => {
  const requiredWords = 3;
  const extractedWords = validatedString.match(wordExtractorRegex).length;
  if (extractedWords >= requiredWords) {
    return validatedString;
  } else {
    throw new Error('Poem has too few words');
  }
};

const allWordsAllowed = (
  validatedString,
  table,
  errorHandler,
  onValidCallback
) => {
  const extractedWords = validatedString.match(wordExtractorRegex);
  const wordsAllowedPromiseArray = extractedWords.map(word => {
    return new Promise((resolve, reject) => {
      wordAllowed(table, word, resolve, reject);
    });
  });
  Promise.all(wordsAllowedPromiseArray)
    .then(values => {
      onValidCallback(values);
    })
    .catch(() => {
      errorHandler(new Error('Foreign words in poem'));
    });
};

module.exports.format = format;
module.exports.wordCount = wordCount;
module.exports.allWordsAllowed = allWordsAllowed;
