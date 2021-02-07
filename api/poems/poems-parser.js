// parses encoded poems to json objects that the browser can render

const dataBetweenAngles = /(?<=<)[^<>]+(?=>)/g;
const dataBetweenCurly = /(?<={)[^{}<>]+(?=})/g;

const makeWordObject = string => {
  const split = string.split(';');
  return {
    connector: split[0],
    height: split[1],
    word: split[2],
  };
};

const breakIntoRows = string =>
  string
    .split(/<[^<>]+>/)
    .filter(element => element !== '')
    .map(encodedRow => encodedRow.match(dataBetweenCurly))
    .map(unparsedRow => unparsedRow.map(makeWordObject));

const appendMarginsToRows = (margins, rows) =>
  rows.map((row, index) => ({
    margin: margins[index],
    words: row,
  }));

const encodedPoemToJSON = databaseObj => {
  const encodedPoem = databaseObj.content;

  const rowMargins = encodedPoem.match(dataBetweenAngles);

  const rows = breakIntoRows(encodedPoem);

  if (rowMargins.length !== rows.length) {
    throw new Error(
      'Invalid poem format - number of row margins do not correspond to number of rows.'
    );
  }

  const rowsWithMarginInfo = appendMarginsToRows(rowMargins, rows);

  return {
    content: 'Poem',
    created: databaseObj.createdAt,
    rows: rowsWithMarginInfo,
  };
};

module.exports = {
  encodedPoemToJSON
}
