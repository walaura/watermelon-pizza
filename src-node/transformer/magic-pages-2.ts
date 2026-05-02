import { Transformer } from "@parcel/plugin";

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    if (!code.trimStart().startsWith('"use preload entrypoint"')) {
      return [asset];
    }

    const pageRunner = await import(asset.filePath);

    asset.type = pageRunner.ASSET_TYPE ?? "html";
    asset.setCode(await pageRunner.default());

    return [asset];
  },
});
