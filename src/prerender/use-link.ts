import { PARCEL_SRC_ROOT } from "#src-node/paths.ts";
import { html } from "common-tags";
import path from "node:path";

export const withOwnStyles = (pathname: string) => {
  return html`<link
    rel="stylesheet"
    class="top-styles"
    href="/src/${pathname.replace(PARCEL_SRC_ROOT, "").replace(".ts", ".css")}"
  />`;
};
