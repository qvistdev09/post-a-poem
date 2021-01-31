const okDigit = "(-{0,1}((0.[0-9]+)|([1-9][0-9]*.[0-9]+)|([1-9][0-9]*)|(0)))"; // refuse bad digits, e.g. "0.", "00", ".", "00.15".
const okWord = "([a-z]+)";
const dataBetweenAngles = /(?<=<)[^<>]+(?=>)/g;
const dataBetweenCurly = /(?<={)[^{}<>]+(?=})/g;
const wordExtractorRegex = /(?<=;)[a-z]+(?=})/g;
const validationRegex = new RegExp(
  `^(<${okDigit}>({${okDigit};${okDigit};${okWord}}){1,3}){1,4}$`
);

const extractWords = encoded => {
  return encoded.match(wordExtractorRegex);
}

const makeWordObject = string => {
  const split = string.split(";");
  return {
    connector: split[0],
    height: split[1],
    word: split[2],
  };
};

const validate = string => {
  if (validationRegex.test(string)) {
    return string;
  } else {
    throw new Error("Invalid poem format - parsing error.");
  }
};

const parse = databaseObj => {
  const rowMargins = databaseObj.content.match(dataBetweenAngles);

  const rows = databaseObj.content
    .split(/<[^<>]+>/)
    .filter(element => element !== "")
    .map(encodedRow => encodedRow.match(dataBetweenCurly))
    .map(unparsedRow => unparsedRow.map(makeWordObject));

  if (rowMargins.length !== rows.length) {
    throw new Error(
      "Invalid poem format - number of row margins do not correspond to number of rows."
    );
  }

  const poemRows = rows.map((wordRow, index) => ({
    margin: rowMargins[index],
    words: wordRow,
  }));

  return { content: "Poem", created: databaseObj.created, rows: poemRows };
};

const checkIfAllowed = (table, word, resolve, reject) => {
  console.log('word', word);
  table.findOne({ where: { content: word } }).then(token => {
    console.log(token, 'token')
    if (token === null) {
      reject(new Error('Word not allowed'));
    } else {
      resolve(word);
    }
  });
};

module.exports.parse = parse;
module.exports.validate = validate;
module.exports.checkIfAllowed = checkIfAllowed;
module.exports.extractWords = extractWords;
