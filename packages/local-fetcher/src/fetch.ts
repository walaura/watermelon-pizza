import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const miniFetchResult = (contents: string) => ({
  text: async () => contents,
  json: async () => JSON.parse(contents),
});

export const fetchWithCache = async (
  shouldBypassCache: boolean,
  url: string,
  params: RequestInit | undefined,
) => {
  const name = createHash("sha1").update(url).digest("base64");
  const cacheAt = path.join(import.meta.dirname, "..", "tmp", name + ".url");

  try {
    await mkdir(path.dirname(cacheAt));
  } catch (e) {}

  try {
    const maybeCachedFile = (await readFile(cacheAt)).toString();
    if (!shouldBypassCache && maybeCachedFile) {
      return miniFetchResult(maybeCachedFile);
    }
  } catch (e) {
    console.log("cache miss");
  }

  const response = await (await fetch(url, params)).text();
  await writeFile(cacheAt, response);

  return miniFetchResult(response);
};
