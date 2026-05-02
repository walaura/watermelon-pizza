import { Transformer } from "@parcel/plugin";
import { existsSync } from "fs";
import { dirname, join } from "path";

module.exports = new Transformer({
  async transform({ asset }) {
    const filePath = asset.filePath;
    const maybeIntakeCode = join(dirname(filePath), "_intake.ts");

    if (!existsSync(maybeIntakeCode)) {
      return [asset];
    }

    const pageRunner = await import(maybeIntakeCode);
    asset.type = "html";
    asset.setCode(
      await pageRunner.default(await asset.getCode(), asset.filePath),
    );

    return [asset];
  },
});
