import { readFile } from "node:fs/promises";
import { brush, convertColor, SET_COLORS } from "painbrush/color";

import { composeLayer, makeLayer, transformLayer } from "painbrush/layer";
import { exportImage } from "painbrush/image";
import { getDefaultFontHandleNode, useFont } from "painbrush/font";
import { getXYCoords } from "painbrush/pixel";

export const prep = async () => {
  const BABU = await useFont(
    readFile(import.meta.dirname + "/fonts/babushka.pxfont"),
  );
  const BABUBO = await useFont(
    readFile(import.meta.dirname + "/fonts/babushka-bold.pxfont"),
  );

  const BG_COLOR = 0x000b55;
  const TEXT_COLOR = 0xf50076;
  const TEXT_COLOR_ALT = 0xffffff;
  const [BG_H, BG_S, BG_L] = rgbToHsl(...convertColor.toRGB(BG_COLOR));

  const make = (heado: string, subbo: string) => {
    let lineOffset = ~~(200 * Math.random());
    const intensity = 0.001 + Math.random() * 0.15;
    const axis = Math.random() > 0.5 ? "x" : "y";
    const counterAxis = axis === "x" ? "y" : "x";

    let ogImageLayer = transformLayer.setBackground(
      transformLayer.pad(
        transformLayer.stackVertical(
          [
            transformLayer.scale(
              makeLayer.text(heado, BABUBO, brush.solidFill(TEXT_COLOR), {
                maxLengthPx: 110,
              }),
              {
                x: 2,
                y: 2,
              },
            ),
            makeLayer.text(subbo, BABU, brush.solidFill(TEXT_COLOR_ALT), {
              maxLengthPx: 200,
            }),
          ],
          12,
        ),
        { x: 90, y: 90 },
      ),
      (index, data) => {
        let BG_H_ = BG_H;
        let BG_S_ = BG_S;
        let BG_L_ = BG_L;

        const coords = getXYCoords(index, data);
        const useAxis = coords[axis];
        const useCounterAxis = coords[counterAxis];

        BG_L_ =
          BG_L_ + (useAxis / data[axis] + lineOffset + 10) * 0.01 * intensity;
        BG_L_ =
          BG_L_ +
          (((Math.random() * useCounterAxis) / data[counterAxis]) * intensity) /
            100;
        BG_S_ = 0.8 + Math.random() * 0.2;
        BG_H_ =
          BG_H_ +
          (useAxis / data[axis]) *
            (Math.random() * 10 * (intensity / 5)) *
            (100 * intensity) *
            intensity;

        return convertColor.fromRGB(
          ...hslToRgb(BG_H_ % 1, BG_S_ % 1, BG_L_ % 1),
        );
      },
    );

    const targetSize = { x: 440, y: 240 };
    // center ogImageLayer in the middle
    const offset = {
      x: (targetSize.x - ogImageLayer.x) / 2,
      y: (targetSize.y - ogImageLayer.y) / 2,
    };

    const target = makeLayer.blankWithAlpha({ x: 440, y: 240 });
    return exportImage(ogImageLayer);
  };
  const heado = "Ok i lied i know how to make these just fine BUT";
  const subbo = "Read on for tales on bitmap generation";
  return make;
};

// ty https://gist.github.com/mjackson/5311256

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  ((r /= 255), (g /= 255), (b /= 255));

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h as number;

    h /= 6;
  }
  h = h as number;
  return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}
