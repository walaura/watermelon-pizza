const path = require("path");
const fs = require("fs-extra");
const extract = require("extract-zip");
const make = require("./template");

const sourcePath = path.resolve(__dirname, "..", "etc", "old");
const targetPath = path.resolve(__dirname, "..", "public", "old");

const extractPromise = file =>
  new Promise((yay, nay) => {
    console.log("unpacking " + file);
    extract(
      path.resolve(sourcePath, file),
      {
        dir: targetPath
      },
      function(err) {
        if (err) nay(err);
        yay(file);
      }
    );
  });

const run = async () => {
  try {
    fs.removeSync(targetPath);
  } catch (e) {}
  fs.mkdirsSync(targetPath);

  const files = fs
    .readdirSync(sourcePath)
    .filter(file => path.extname(file) === ".zip");

  await Promise.all(files.map(extractPromise));
  fs.writeFileSync(path.resolve(targetPath, "index.html"), make(files.length));
  return;
};

run().then(() => console.log("unpacked"));
