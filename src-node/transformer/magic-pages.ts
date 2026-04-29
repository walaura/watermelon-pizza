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
    if (code.substring(0, 5) !== "MAGIC") {
      return [asset];
    }
    const load = PAGES[code.split(":")[1].trim()];

    const { type, content } = await load.render();
    asset.setCode(content);
    asset.type = type;

    return [asset];
  }
});
