const TOP_LEVEL_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1234"
    : "https://www.laura.monster";

export { TOP_LEVEL_DOMAIN };
