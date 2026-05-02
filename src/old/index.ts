"use yummers";

import path from "path";
import { PARCEL_SRC_ROOT } from "#/paths.ts";
import { readdir } from "fs/promises";
import { html } from "#prerender/sys/tags.ts";

const IndexTpl = (count: number) => {
  return html`
    <div>
      <div>hey welcome to the time capsule</div>

      <div>
        ${Array.from(Array(count).keys())
          .map(
            (index) => `<a href="/src/old/${index + 1}.zip">${index + 1}</a>`,
          )
          .join("")}
        <a href="/">NOW</a>
      </div>
    </div>
    <style type="text/css">
      :root {
        background: black;
        color: white;
        font-family: monospace;
      }
      body {
        display: flex;
        align-items: center;
        justify-content: center;

        & > div {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
      a {
        color: inherit;
        padding: 2em;
        display: inline-block;
        margin: 1em 0.5em;
        font-weight: bold;
        background: white;
        color: black;
      }
    </style>
  `;
};

export default async () => {
  const dirPath = path.join(PARCEL_SRC_ROOT, "old");

  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".zip"),
  );

  return IndexTpl(files.length);
};
