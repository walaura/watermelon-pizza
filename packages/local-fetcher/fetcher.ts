#!/usr/bin/env node

import { fetchWithCache } from "./src/fetch.ts";
import blueskyWidget from "./widget/bluesky.ts";
import steamWidget from "./widget/steam.ts";
import weatherWidget from "./widget/weather.ts";
import { program as commander } from "commander";
import { inspect } from "util";

const WIDGETS = [blueskyWidget, weatherWidget, steamWidget];
const hydratedWidgets = await Promise.all(
  WIDGETS.map(async ({ fetchFrom: [fetchUrl, fetchParams], unmangle, name }) =>
    (async () => {
      try {
        const rawData = await fetchWithCache(fetchUrl.toString(), fetchParams);
        const data = await unmangle(await rawData.text());
        return { data, name };
      } catch (e) {
        console.error(e);
        return { name, error: true };
      }
    })(),
  ),
);

commander
  .option("-d, --debug", "Print to terminal instead of saving.")
  .parse(process.argv);

const options = commander.opts();
options.debug &&
  console.log(
    inspect(hydratedWidgets, { showHidden: false, depth: null, colors: true }),
  );

export {};
