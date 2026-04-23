import { MagicPage } from "./magic-pages";

const feedPage: MagicPage = {
  route: "feed",
  render: async () => {
    return {
      type: "html",
      content: "hivdfdf"
    };
  }
};

export default feedPage;
