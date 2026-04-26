import { Transformer } from "@parcel/plugin";
import * as path from "path";
import { parseMd } from "./md/parse-md";
import Blogpost from "../templates/Blogpost";
import { PARCEL_SRC_ROOT } from "../paths";
import { readdir, readFile } from "fs/promises";
import { Dirent } from "fs";
import { HydratedWidget } from "local-fetcher/fetcher";

const getClosestWidget = async (date: Date): Promise<HydratedWidget[]> => {
  const dirPath = path.join(PARCEL_SRC_ROOT, "widget-data");

  const entries = await readdir(dirPath, { withFileTypes: true });
  const closestFile = (entries
    .map((entry) => {
      const distance = Math.abs(date.getTime() / 1000 - parseInt(entry.name));
      return [entry, distance] as [Dirent, number];
    })
    .sort((a, b) => a[1] - b[1])
    .shift() ?? [])[0];

  if (!closestFile) {
    return [];
  }

  const widget = (
    await readFile(path.join(closestFile.parentPath, closestFile.name))
  ).toString();

  return JSON.parse(widget) as HydratedWidget[];
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

    const code = await asset.getCode();
    const post = await parseMd(filePath, code);
    const widgets = await getClosestWidget(post.meta.date);

    asset.type = "html";
    asset.setCode(
      Blogpost({
        post,
        widgets,
      }),
    );

    return [asset];
  },
});
