import { Transformer } from "@parcel/plugin";
import * as path from "path";
import * as fs from "fs/promises";
import * as parseMd from "../md-plugin/parseMd";

module.exports = new Transformer({
  async transform({ asset }) {
    const content = await asset.getCode();
    const toc = await generateToc(path.dirname(asset.filePath));
    const newContent = content.replace("%MD_TOC%", toc);
    asset.setCode(newContent);
    return [asset];
  },
});
