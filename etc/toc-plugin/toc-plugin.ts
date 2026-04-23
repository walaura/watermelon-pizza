import { Transformer } from "@parcel/plugin";
import * as path from "path";
import * as fs from "fs/promises";
import * as parseMd from "../md-plugin/parseMd";

const generateToc = async (dirPath: string): Promise<string> => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".md"),
  );
  const items = (
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file.name);
        const content = await fs.readFile(filePath, "utf-8");
        console.log({ filePath });
        return await parseMd.parseMd(filePath, content);
      }),
    )
  ).sort((item) => item.meta.date.getTime());
  const listItems = items
    .map(
      (item) =>
        `<li><a href="${item.meta.permalink}">${item.meta.title}</a></li>`,
    )
    .join("\n");
  return `<ul>\n${listItems}\n</ul>`;
};

module.exports = new Transformer({
  async transform({ asset }) {
    const content = await asset.getCode();
    const toc = await generateToc(path.dirname(asset.filePath));
    const newContent = content.replace("%MD_TOC%", toc);
    asset.setCode(newContent);
    return [asset];
  },
});
