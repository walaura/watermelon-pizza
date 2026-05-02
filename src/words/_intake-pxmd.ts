"use intake";

import { readFile } from "fs/promises";
import {
  initializeImageMagick,
  ImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";
import { prep } from "local-bitmo";
import { DATA_ROOT } from "#/paths.ts";
import { parseMd } from "#src/prerender/parse-md.ts";

export default async (_: string, filePath: string) => {
  const supportingMDFilePath = filePath.replace(".pxmd", ".md");
  const supportingMDFile = await readFile(supportingMDFilePath);
  const post = await supportingMDFile.toString();
  const postData = await parseMd(supportingMDFilePath, post);

  const title = (postData.meta.title ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("\n")
    .filter(Boolean)
    .join("")
    .trim();
  const desc = (postData.meta.desc ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("\n")
    .filter(Boolean)
    .join("")
    .trim();

  const makeHeaderImage = await prep();
  const innards = { title, desc };
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

  return magick as Buffer<ArrayBufferLike>;
};

export const ASSET_TYPE = "png";
