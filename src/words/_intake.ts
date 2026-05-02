"use intake";

import { parseMd } from "#src-node/transformer/md/parse-md.ts";
import wordsArticlePage from "#src/prerender/pages/words-article.ts";

export default async (post: string, filePath: string) => {
  const data = await parseMd(filePath, post);
  return wordsArticlePage(data);
};
