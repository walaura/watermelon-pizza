import * as path from "path";
import * as fs from "fs/promises";
import { PARCEL_SRC_ROOT } from "#/paths.ts";
import { parseMd, type Post } from "#prerender/parse-md.ts";

let cache: Post[] = [];

const listBlogEntries = async (): Promise<Post[]> => {
  if (cache.length) {
    console.log("hit");
    return cache;
  }
  console.log("miss");

  const dirPath = path.join(PARCEL_SRC_ROOT, "words");
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".md"),
  );
  cache = (
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file.name);
        const content = await fs.readFile(filePath, "utf-8");
        return await parseMd(filePath, content);
      }),
    )
  )
    .filter((item) => !item.meta.isDraft)
    .sort(
      (itemA, itemB) => itemB.meta.date.getTime() - itemA.meta.date.getTime(),
    );

  return cache;
};

export default listBlogEntries;
