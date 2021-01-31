const dataBetweenAngles = /(?<=<)[^<>]+(?=>)/g;
const dataBetweenCurly = /(?<={)[^{}<>]+(?=})/g;

const makeWordObject = string => {
  const split = string.split(";");
  return {
    connector: split[0],
    height: split[1],
    word: split[2],
  };
};

const encodedPoemToJSON = databaseObj => {
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

module.exports.encodedPoemToJSON = encodedPoemToJSON;
