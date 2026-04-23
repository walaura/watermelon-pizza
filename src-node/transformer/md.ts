import { Transformer } from "@parcel/plugin";
import * as path from "path";
import { parseMd } from "./md/parse-md";

export type Meta = {
  date: Date;
  title: string;
  permalink: string;
};

module.exports = new Transformer({
  async transform({ asset }) {
    const filePath = asset.filePath;
    if (
      !filePath.includes(`${path.sep}words${path.sep}`) ||
      !filePath.endsWith(".md")
    ) {
      return [asset];
    }

    const templatePath = path.join(__dirname, "./md/template.html");
    const template = await asset.fs.readFile(templatePath, "utf-8");

    const code = await asset.getCode();
    // Parse markdown to HTML
    const html = await parseMd(filePath, code);
    asset.type = "html";

    const dateObj = html.meta.date;
    const dateForHumans = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const dateForMeta = dateObj.toISOString();

    asset.setCode(
      template
        .replaceAll(
          "#HEY#",
          `<date datetime="${dateForMeta}">${dateForHumans}</date>` +
            `<h1>${html.meta.title}</h1>` +
            (html.maybeCss
              ? `<style>.article-wrapper { ${html.maybeCss} }</style>`
              : "") +
            html.htmlContent
        )
        .replaceAll("#LINK#", encodeURIComponent(html.meta.permalink))
        .replaceAll("#TITLE#", html.meta.title)
    );
    return [asset];
  }
});
