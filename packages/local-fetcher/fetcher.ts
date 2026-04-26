#!/usr/bin/env node

import { fetchWithCache } from "./src/fetch.ts";
import blueskyWidget from "./widget/bluesky.ts";
import steamWidget from "./widget/steam.ts";
import weatherWidget from "./widget/weather.ts";
import { program as commander } from "commander";
import { inspect } from "util";
import ytWidget from "./widget/yt.ts";
import path from "path";
import { writeFile } from "fs/promises";

commander
  .option("-d, --debug", "Print to terminal instead of saving.")
  .option("-s, --save-to <dir>", "Save to a directory.")
  .option("-c, --clean", "Skip caching.")
  .parse(process.argv);

const options = commander.opts();

const WIDGETS = [blueskyWidget, weatherWidget, steamWidget, ytWidget];
const hydratedWidgets = await Promise.all(
  WIDGETS.map(async ({ fetchFrom: [fetchUrl, fetchParams], unmangle, name }) =>
    (async () => {
      try {
        const rawData = await fetchWithCache(
          options.clean != null,
          fetchUrl.toString(),
          fetchParams,
        );
        const data = await unmangle(await rawData.text());
        return { data, name };
      } catch (e) {
        console.error(e);
        return { name, error: true };
      }
    })(),
  ),
);

if (options.debug) {
  console.log(
    inspect(hydratedWidgets, { showHidden: false, depth: null, colors: true }),
  );
  process.exit();
}

if (options.saveTo) {
  const name = Math.floor(Date.now() / 1_000_000) * 1_000;
  const dir = path.join(process.cwd(), options.saveTo, name + ".json");

  writeFile(dir, JSON.stringify(hydratedWidgets, null, 2));
  console.info("Widgets saved!");
  console.info(dir);
}

export {};
