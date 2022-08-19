const fs = require("fs");

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };
};

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return readFile(files[0], { encoding: "utf8" });
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.error("err: ", err);
  });
