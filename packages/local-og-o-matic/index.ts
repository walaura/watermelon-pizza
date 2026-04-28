import { readFile, writeFile } from "node:fs/promises";
import {
  makeRectangleLayer,
  makeTextLayer,
  overlayLayerOver,
  padLayer,
} from "painbrush/layer";
import { loadBuiltInFont, useFont } from "painbrush/typography";
import { borderBrush, COLOR_BLACK, solidFillBrush } from "painbrush/color";
import { toImage } from "painbrush/image";

const POXEL = await loadBuiltInFont();
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

const l = padLayer(
  makeTextLayer(body, BABU, solidFillBrush(COLOR_BLACK), {
    maxLengthPx: 200,
    letterPlateBrush: borderBrush(1, [255, 0, 255]),
  }),
  { x: 10, y: 10 },
);
let lbUTpRETTY = padLayer(
  makeTextLayer(body, BABU, solidFillBrush([6, 10, 54]), {
    maxLengthPx: 260,
  }),
  { x: 20, y: 20 },
);
lbUTpRETTY = overlayLayerOver(
  makeRectangleLayer(
    { x: lbUTpRETTY.width, y: lbUTpRETTY.height },
    solidFillBrush([255, 53, 115]),
  ),
  lbUTpRETTY,
);

await writeFile("./img.bmp", toImage(lbUTpRETTY));
