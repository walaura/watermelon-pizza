import { Transformer } from "@parcel/plugin";

import feed from "./magic-pages/feed";
import toc from "./magic-pages/toc";
import old from "./magic-pages/old";
import { MagicPage } from "./magic-pages/magic-pages";

const PAGES: {
  [key: string]: MagicPage;
} = { feed, toc, old };

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    asset.type = "html";

    const pageRunner = await import(asset.filePath);
    asset.setCode(pageRunner.default());

    return [asset];
  },
});
