import listBlogEntries from "../../list-blog-entries";
import Toc from "../../templates/Toc";
import { MagicPage } from "./magic-pages";

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
