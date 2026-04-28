import { writeFile } from "node:fs/promises";
import { makeTextLayer } from "painbrush/layer";
import { loadBuiltInFont } from "painbrush/typography";
import { COLOR_BLACK, solidFillBrush } from "painbrush/color";
import { toImage } from "painbrush/image";

const POXEL = await loadBuiltInFont();

const l = makeTextLayer("hello test", POXEL, solidFillBrush(COLOR_BLACK));

await writeFile("./img.bmp", toImage(l));
