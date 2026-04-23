import { Transformer } from "@parcel/plugin";
import * as path from "path";
import { marked } from "marked";

module.exports = new Transformer({
  async transform({ asset }) {
    // Only process .md files in /words
    const filePath = asset.filePath;
    if (
      !filePath.includes(`${path.sep}words${path.sep}`) ||
      !filePath.endsWith(".md")
    ) {
      return [asset];
    }

    const templatePath = path.join(__dirname, "template.html");
    const template = await asset.fs.readFile(templatePath, "utf-8");

    const code = await asset.getCode();
    // Parse markdown to HTML
    const html = "walala";
    asset.type = "html";
    asset.setCode(
      template
        .replaceAll("#HEY#", html)
        .replaceAll("#LINK#", encodeURIComponent(filePath)),
    );
    return [asset];
  },
});
