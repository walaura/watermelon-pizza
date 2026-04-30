import { Transformer } from "@parcel/plugin";
import { prep } from "local-bitmo";

import {
  initializeImageMagick,
  ImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";
import { readFile } from "fs/promises";
import { DATA_ROOT } from "../paths";

module.exports = new Transformer({
  async transform({ asset }) {
    const makeHeaderImage = await prep();
    const innards = JSON.parse(await asset.getCode());
    const imageBmp = makeHeaderImage(innards.title, innards.desc);

    const wasmLocation =
      DATA_ROOT + "/node_modules/@imagemagick/magick-wasm/dist/magick.wasm";
    const wasmBytes = await readFile(wasmLocation);
    await initializeImageMagick(wasmBytes);

    const magick = await new Promise((yay, nay) => {
      ImageMagick.read(imageBmp, (image) => {
        image.resize(440 * 3, 240 * 3, 1);

        image.write(MagickFormat.Png, (data) => {
          yay(data);
        });
      });
    });

    asset.setBuffer(magick as Buffer<ArrayBufferLike>);
    asset.type = "png";

    return [asset];
  },
});
