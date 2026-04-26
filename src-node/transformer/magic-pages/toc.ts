import listBlogEntries from "../../list-blog-entries";
import Toc from "../../templates/Toc";
import { MagicPage } from "./magic-pages";

const tocPage: MagicPage = {
  render: async () => {
    const posts = await listBlogEntries();
    console.log(posts.length);
    return {
      type: "html",
      content: Toc({
        posts,
      }),
    };
  },
};

export default tocPage;
