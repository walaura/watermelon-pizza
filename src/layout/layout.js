import React from "react";
import "../css/css.css";
import { Helmet } from "react-helmet";

import { block } from "./layout.module.css";

export const WrapBlock = ({ children, outside, inverted }) => {
  return (
    <div className={block} data-inverted={inverted}>
      {outside}
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default ({ children, title }) => (
  <>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="user-scalable=0, initial-scale=1.0" />
      <meta
        name="Description"
        content="Hi! I'm Laura González – an artist, speaker,
		developer, and overall disgrace."
      />
      <title>{[title, "Laura González"].filter(Boolean).join(" - ")}</title>
      <link rel="shortcut icon" href={require("../css/mushroom.png")}></link>
      <html lang="en" />
    </Helmet>
    {children}
  </>
);
