import { Transformer } from "@parcel/plugin";
import { existsSync } from "fs";
import { dirname, join, parse } from "path";

module.exports = new Transformer({
  async transform({ asset }) {
    const filePath = asset.filePath;
    const maybeIntakeCode = join(
      dirname(filePath),
      "_intake-" + parse(filePath).ext.substring(1, Infinity) + ".ts",
    );
    if (!existsSync(maybeIntakeCode)) {
      return [asset];
    }

    const pageRunner = await import(maybeIntakeCode);
    asset.type = pageRunner.ASSET_TYPE ?? "html";
    asset.setCode(
      await pageRunner.default(await asset.getCode(), asset.filePath),
    );
    if (pageRunner.ASSET_TYPE == null) {
      console.log(await asset.getCode());
    }

    return [asset];
  },
});
