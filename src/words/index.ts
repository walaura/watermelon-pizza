"use yummers";

import listBlogEntries from "#src-node/list-blog-entries.ts";
import wordsTocPage from "#src/prerender/pages/words-toc.ts";

export default async () => {
  const posts = await listBlogEntries();
  return wordsTocPage({ posts });
};
