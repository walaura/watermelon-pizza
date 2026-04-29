import { Transformer } from "@parcel/plugin";
import * as path from "path";

import extract from "extract-zip";
import { dirname } from "path";
import { DATA_ROOT, DIST_ROOT, PARCEL_SRC_ROOT } from "../paths";

const extractPromise = (sourcePath: string, targetPath: string) =>
  new Promise((yay, nay) => {
    extract(
      path.resolve(sourcePath),
      {
        dir: targetPath
      },
      function(err) {
        if (err) {
          nay(err);
          return;
        }
        yay(sourcePath);
      }
    );
  });

module.exports = new Transformer({
  async transform({ asset, options, config }) {
    const targetPath = path.join(
      DIST_ROOT,
      dirname(asset.filePath.replace(PARCEL_SRC_ROOT, ""))
    );

    const name = path.basename(asset.filePath, ".zip");

    await extractPromise(asset.filePath, targetPath);

    return [
      {
        type: "html",
        isSource: false,
        content: `<meta http-equiv="refresh" content="0; url=./${name}/index.html" />`,
        pipeline: undefined
      }
    ];
  }
});
