import listBlogEntries from "../../list-blog-entries.ts";
import Toc from "../../templates/Toc.ts";
import { MagicPage } from "./magic-pages.ts";

const tocPage: MagicPage = {
  render: async () => {
    const posts = await listBlogEntries();
    return {
      type: "html",
      content: Toc({
        posts,
      }),
    };
  },
};

export default tocPage;
