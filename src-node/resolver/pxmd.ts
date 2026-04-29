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
    const assetFilePath = path.resolve(
      PARCEL_SRC_ROOT,
      "words",
      fileName + ".bmp",
    );
    const supportingMDFile = await readFile(supportingMDFilePath);

    if (!supportingMDFile) {
      console.warn("uhhh");
      return;
    }
    const post = await supportingMDFile.toString();
    const postData = await parseMd(supportingMDFilePath, post);

    const title = (postData.meta.title ?? "hey")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    const desc = (postData.meta.desc ?? "hey")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    console.log(import.meta.dirname);
    console.log(assetFilePath);
    console.log(assetFilePath);
    console.log(import.meta.dirname);
    return {
      filePath: "/hello.bp",
      code: JSON.stringify({
        title: "sdfgdfg",
        desc: "1212",
      }),
    };
  },
});
