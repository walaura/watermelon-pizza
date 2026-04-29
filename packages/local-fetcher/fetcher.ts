#!/usr/bin/env node

import { fetchWithCache } from "./src/fetch.ts";
import { program as commander } from "commander";
import { inspect } from "util";
import path from "path";
import { writeFile } from "fs/promises";
import { WIDGETS } from "./widgets.ts";
import type { HydratedWidget } from "./widgets.ts";

commander
  .option("-d, --debug", "Print to terminal instead of saving.")
  .option("-s, --save-to <dir>", "Save to a directory.")
  .option("-c, --clean", "Skip caching.")
  .parse(process.argv);

const options = commander.opts();

const hydratedWidgets: HydratedWidget[] = await Promise.all(
  WIDGETS.map(
    async ({ fetchFrom: [fetchUrl, fetchParams], unmangle, name }) => {
      try {
        const rawData = await fetchWithCache(
          options.clean != null,
          fetchUrl.toString(),
          fetchParams,
        );
        const data = await unmangle(await rawData.text());
        return { data, name } as HydratedWidget;
      } catch (e) {
        console.error(e);
        return { name, error: true } as HydratedWidget;
      }
    },
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

export { hydratedWidgets };

export type { HydratedWidget };
