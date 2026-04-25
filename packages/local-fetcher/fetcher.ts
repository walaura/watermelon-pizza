#!/usr/bin/env node

import { fetchWithCache } from "./src/fetch.ts";
import blueskyWidget from "./widget/bluesky.ts";
import weatherWidget from "./widget/weather.ts";

const WIDGETS = [blueskyWidget, weatherWidget];
const hydratedWidgets = await Promise.all(
  WIDGETS.map(async ({ fetchFrom: [fetchUrl, fetchParams], unmangle, name }) =>
    (async () => {
      const rawData = await fetchWithCache(fetchUrl.toString(), fetchParams);
      const data = await unmangle(await rawData.text());
      return { data, name: name };
    })(),
  ),
);

console.log(JSON.stringify(hydratedWidgets, null, 2));
export {};
