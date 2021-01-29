const validationRegex = /^((<-{0,1}((0\.[0-9]+)|([1-9][0-9]*\.[0-9]+)|([1-9][0-9]*)|(0))>(\[-{0,1}((0\.[0-9]+)|([1-9][0-9]*\.[0-9]+)|([1-9][0-9]*)|(0));-{0,1}((0\.[0-9]+)|([1-9][0-9]*\.[0-9]+)|([1-9][0-9]*)|(0));[a-z]+\]){1,3})){1,4}$/;

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

const parse = validatedString => {
  const rowMargins = validatedString.match(/(?<=<)[^<>]+(?=>)/g);
  console.log(rowMargins + "---rowmargins");
  const rows = validatedString
    .split(/<[^<>]+>/)
    .filter(element => element !== "")
    .map(encodedRow => encodedRow.match(/(?<=\[)[^\[\]]+(?=\])/g))
    .map(array => array.map(makeWordObject));

  console.log(rows);

  if (rowMargins.length !== rows.length) {
    throw new Error(
      "Invalid poem format - number of row margins do not correspond to number of rows."
    );
  }

  const poemRows = rows.map((wordRow, index) => ({
    margin: rowMargins[index],
    words: wordRow,
  }));

  return { content: "Poem", rows: poemRows };
};

module.exports.parse = parse;
module.exports.validate = validate;
