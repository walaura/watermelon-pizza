import { readFile, writeFile } from "node:fs/promises";
import { brush, SET_COLORS } from "painbrush/color";

import { makeLayer, transformLayer } from "painbrush/layer";
import { exportImage } from "painbrush/image";
import { getDefaultFontHandleNode, useFont } from "painbrush/font";

const POXEL = await useFont(getDefaultFontHandleNode());
const BABU = await useFont(readFile("./fonts/babushka.pxfont"));

const pangram = "Portez ce vieux whisky au juge blond qui fume"
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const body =
  pangram.toUpperCase() +
  "\n\n" +
  pangram +
  "\n\n" +
  "0123456789" +
  "?!()[]><@+-.,'";

const l = transformLayer.pad(
  makeLayer.text(body, BABU, brush.solidFill(SET_COLORS.BLACK), {
    maxLengthPx: 200,
    letterPlateBrush: brush.border(1, SET_COLORS.GREEN),
  }),
  { x: 10, y: 10 },
);
let lbUTpRETTY = transformLayer.setBackground(
  transformLayer.pad(
    makeLayer.text(body, BABU, brush.solidFill(0x060a36), {
      maxLengthPx: 260,
    }),
    { x: 20, y: 20 },
  ),
  brush.solidFill(0xff3573),
);

await writeFile("./img.bmp", exportImage(lbUTpRETTY));
