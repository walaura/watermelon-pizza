import { Transformer } from "@parcel/plugin";
import * as path from "path";
import { parseMd } from "./md/parse-md";
import BlogPost from "./templates/Blogpost";
import Blogpost from "./templates/Blogpost";

module.exports = new Transformer({
  async transform({ asset }) {
    const filePath = asset.filePath;
    if (
      !filePath.includes(`${path.sep}words${path.sep}`) ||
      !filePath.endsWith(".md")
    ) {
      return [asset];
    }

    const code = await asset.getCode();

    const post = await parseMd(filePath, code);

    asset.type = "html";
    asset.setCode(
      Blogpost({
        post
      })
    );

    return [asset];
  }
});
