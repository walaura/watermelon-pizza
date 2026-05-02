import { Resolver } from "@parcel/plugin";
import * as path from "path";
import { PARCEL_SRC_ROOT } from "../../paths";
import { readFile } from "fs/promises";

module.exports = new Resolver({
  async resolve({ specifier }) {
    if (!specifier.endsWith(".pxmd")) {
      return;
    }

    const fileName = path.basename(specifier, ".pxmd");
    const supportingMDFilePath = path.resolve(
      PARCEL_SRC_ROOT,
      "words",
      fileName + ".md",
    );
    const supportingMDFile = await readFile(supportingMDFilePath);

    if (!supportingMDFile) {
      console.warn("uhhh");
      return;
    }
    return {
      filePath: PARCEL_SRC_ROOT + "/words/" + fileName + ".pxmd",
      code: "HEY IM REAL",
    };
  },
});
