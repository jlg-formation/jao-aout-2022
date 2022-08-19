const fs = require("fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.error("err: ", err);
    return;
  }
  console.log("files: ", files);
  fs.readFile(files[0], { encoding: "utf8" }, (err, content) => {
    if (err) {
      console.error("err: ", err);
      return;
    }
    console.log("content: ", content);
  });
});
