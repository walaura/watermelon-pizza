import chalk from "chalk";
import { readFile } from "node:fs/promises";

const report = (type: 0 | 1 | 2 | 3) => (msg: string) => {
  const prefix = {
    0: chalk.green(`✓ `),
    1: chalk.red(`☠ `),
    2: chalk.yellow(`✦ `),
    3: chalk.white(`  `),
  }[type];
  process.stdout.write("\n" + prefix + msg);
};

export const reportYay = report(0);
export const reportNay = report(1);
export const reportInfo = report(2);
export const reportEmpty = report(3);

export const drawLogo = async () => {
  const logo = (await readFile(import.meta.dirname + "/logo.txt"))
    .toString()
    .split("\n");

  const FROM_COLOR = [26, 12, 140];
  const TO_COLOR = [255, 53, 115];

  const lerp = (a: number, b: number, t: number) =>
    Math.round(a * (1 - t) + b * t);

  logo.forEach((l, index, arr) => {
    const step = index / (arr.length - 1);
    console.log(
      chalk.bold(
        chalk.rgb(
          lerp(FROM_COLOR[0], TO_COLOR[0], step),
          lerp(FROM_COLOR[1], TO_COLOR[1], step),
          lerp(FROM_COLOR[2], TO_COLOR[2], step),
        )(l.substring(0, process.stdout.columns)),
      ),
    );
  });
};
