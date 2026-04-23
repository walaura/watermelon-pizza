import { Transformer } from "@parcel/plugin";
import * as path from "path";
import * as fs from "fs/promises";

import feed from "./magic-pages/feed";
import { dirname } from "path";

const PAGES = [feed];

module.exports = new Transformer({
  async transform({ asset }) {
    console.log(23432324);
    console.log(12, asset.filePath);
    console.log(23432324);

    asset.setCode("12212");

    const allAssets = await Promise.all(
      PAGES.map(async ({ route, render }) => {
        const uniqueKey = "test/feed.xml";
        const r = await render();
        asset.addDependency({
          specifier: uniqueKey,
          specifierType: "esm"
        });
        return {
          ...r,
          uniqueKey,
          filePath: dirname(asset.filePath) + "test.html",
          bundleBehavior: "isolated"
        };
      })
    );
    return [asset, ...allAssets];
  }
});
