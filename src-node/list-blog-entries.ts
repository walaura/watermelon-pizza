import * as path from "path";
import * as fs from "fs/promises";
import { PARCEL_SRC_ROOT } from "./paths";
import { parseMd } from "./transformer/md/parse-md";
import { Post } from "./transformer/md/md.t";

const listBlogEntries = async (): Promise<Post[]> => {
  const dirPath = path.join(PARCEL_SRC_ROOT, "words");

  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".md"),
  );
  return (
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file.name);
        const content = await fs.readFile(filePath, "utf-8");
        return await parseMd(filePath, content);
      }),
    )
  ).sort(
    (itemA, itemB) => itemB.meta.date.getTime() - itemA.meta.date.getTime(),
  );
};

export default listBlogEntries;
