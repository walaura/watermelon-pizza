#!/usr/bin/env node

import { fetchWithCache } from "./src/fetch.ts";
import blueskyWidget from "./widget/bluesky.ts";

const WIDGETS = [blueskyWidget];
const hydratedWidgets = await Promise.all(
  WIDGETS.map(async ({ fetchFromUrl, unmangle, name }) =>
    (async () => {
      const rawData = await fetchWithCache(fetchFromUrl.toString());
      const data = await unmangle(await rawData.text());
      return { data, name: name };
    })()
  )
);

console.log(hydratedWidgets);

export {};
