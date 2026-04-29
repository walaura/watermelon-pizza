import { Transformer } from "@parcel/plugin";

import { prep } from "../../packages/local-ogomatic/f";

module.exports = new Transformer({
  async transform({ asset, options, config }) {
    const makeHeaderImage = await prep();
    const image = makeHeaderImage("dsf", "sdfsdf");

    asset.setBuffer(image);
    asset.type = "bmp";

    return [asset];
  },
});
