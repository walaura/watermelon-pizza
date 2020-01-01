import React from "react";
import "../css/css.css";
import { Helmet } from "react-helmet";

import Stickers from "./stickers/stickers";

export default ({ children, hasThings }) => (
  <>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="user-scalable=0, initial-scale=1.0" />
      <meta
        name="Description"
        content="Hi! I'm Laura González – an artist, speaker,
		developer, and overall disgrace."
      />
      <title>Laura González</title>
      <link rel="shortcut icon" href={require("../css/mushroom.png")}></link>
      <html class={hasThings && "inverted"} />
    </Helmet>
    {hasThings && <Stickers />}
    <x-fg>
      <div className="wrapper">{children}</div>
    </x-fg>
  </>
);
