import listBlogEntries from "../../src-node/list-blog-entries.ts";
import Toc from "#src-node/templates/Toc.ts";

export default async () => {
  const posts = await listBlogEntries();
  Toc({ posts });
};
