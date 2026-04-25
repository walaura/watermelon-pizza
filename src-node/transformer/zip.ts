import { Transformer } from "@parcel/plugin";
import * as path from "path";

import extract from "extract-zip";
import { dirname } from "path";

const extractPromise = (sourcePath: string, targetPath: string) =>
  new Promise((yay, nay) => {
    extract(
      path.resolve(sourcePath),
      {
        dir: targetPath
      },
      function(err) {
        if (err) nay(err);
        yay(sourcePath);
      }
    );
  });

module.exports = new Transformer({
  async transform({ asset, options }) {
    if (options.serveOptions == false) {
      throw "no";
    }

    const targetPath = options.serveOptions.distDir + "/" + "old";
    const name = path.basename(asset.filePath, ".zip");

    await extractPromise(asset.filePath, targetPath);

    return [
      {
        type: "html",
        isSource: false,
        filePath: asset.filePath.replace(".zip", "/index.html"),
        content: `<meta http-equiv="refresh" content="0; url=./${name}/index.html" />`,
        pipeline: undefined
      }
    ];
  }
});
