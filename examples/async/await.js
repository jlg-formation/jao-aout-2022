const fs = require("fs").promises;

try {
  const files = await fs.readdir(".");
  console.log("files: ", files);

  const content = await fs.readFile(files[0], { encoding: "utf8" });
  console.log("content: ", content);
} catch (err) {
  console.error("err: ", err);
}
