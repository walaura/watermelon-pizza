import { Resolver } from "@parcel/plugin";
import * as path from "path";
import { parseMd } from "../transformer/md/parse-md";
import { PARCEL_SRC_ROOT } from "../paths";
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
    const post = await supportingMDFile.toString();
    const postData = await parseMd(supportingMDFilePath, post);

    const title = (postData.meta.title ?? "hey")
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split("\n")
      .filter(Boolean)
      .join("")
      .trim();
    const desc = (postData.meta.desc ?? "hey")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split("\n")
      .filter(Boolean)
      .join("")
      .trim();
    return {
      filePath: PARCEL_SRC_ROOT + "/words/" + fileName + ".pxmd",
      code: JSON.stringify({
        title,
        desc,
      }),
    };
  },
});
