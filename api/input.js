const validationRegex = /^((<([1-9]+([0-9]*|\.[0-9]+))>(\[[1-9]([0-9]*|[0-9]*\.[0-9]+);-{0,1}[1-9]([0-9]*|[0-9]*\.[0-9]+);[a-z]+\]){1,3})){1,4}$/;
const separatorRegex = /(?<=\[)[a-z0-9.;]+(?=\])/g;

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
  const rowMargins = validatedString.match(/(?<=<)[0-9]+(?=>)/g);
  const rows = validatedString
    .split(/<[0-9]+>/)
    .filter(element => element !== "")
    .map(element => element.match(separatorRegex));

  if (rowMargins.length !== rows.length) {
    throw new Error(
      "Invalid poem format - number of row margins do not correspond to number of rows."
    );
  }

  const parsedRows = rowMargins.map((rowMargin, index) => ({
    margin: rowMargin,
    words: rows[index].map(makeWordObject),
  }));

  return parsedRows;
};

module.exports.parse = parse;
module.exports.validate = validate;
