const get = require("./http-methods/get");
const post = require("./http-methods/post");

const api = (req, res, next) => {
  const { path } = req;
  if (req.method === "GET") {
    switch (true) {
      case path === "/poems":
        return get.poems(req, res);
      case path === "/words":
        return get.words(req, res);
      default:
        return next();
    }
  } else if (req.method === "POST" && path === "/submit") {
    return post.poem(req, res);
  } else {
    return next();
  }
};

module.exports = api;
