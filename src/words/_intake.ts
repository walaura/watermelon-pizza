"use intake";

import wordsArticlePage from "#src/prerender/pages/words-article.ts";
import { parseMd } from "#src/prerender/parse-md.ts";

export default async (post: string, filePath: string) => {
  const data = await parseMd(filePath, post);
  return wordsArticlePage(data);
};
