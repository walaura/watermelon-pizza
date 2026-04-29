import path from "path";

const TOP_LEVEL_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1234"
    : "https://www.laura.monster";

const DATA_ROOT = path.join(import.meta.dirname, "..");
const DIST_ROOT = path.join(DATA_ROOT, "dist");
const PARCEL_SRC_ROOT = path.join(DATA_ROOT, "src");

export { TOP_LEVEL_DOMAIN, DATA_ROOT, PARCEL_SRC_ROOT, DIST_ROOT };
