import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const miniFetchResult = (contents: string) => ({
  text: async () => contents,
  json: async () => JSON.parse(contents),
});

export const fetchWithCache = async (
  url: string,
  params: RequestInit | undefined,
) => {
  const cacheAt = path.join(
    import.meta.dirname,
    "..",
    "tmp",
    btoa(url) + ".url",
  );

  try {
    await mkdir(path.dirname(cacheAt));
  } catch (e) {}

  try {
    const maybeCachedFile = (await readFile(cacheAt)).toString();
    if (maybeCachedFile) {
      return miniFetchResult(maybeCachedFile);
    }
  } catch (e) {
    console.log("cache miss");
  }

  const response = await (await fetch(url, params)).text();
  await writeFile(cacheAt, response);

  return miniFetchResult(response);
};
