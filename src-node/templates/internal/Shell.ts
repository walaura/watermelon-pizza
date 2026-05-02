import { html } from "common-tags";

export const Shell = ({
  head = "",
  title,
  colophon = "",
  body = "",
}: {
  head?: string;
  colophon?: string;
  title: string;
  body: string;
}) =>
  html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=0, initial-scale=1.0"
        />
        <title>${title}</title>
        <link
          rel="shortcut icon"
          href="/src/mushroom.png"
        />
        <link
          rel="stylesheet"
          href="/src/css/words.css"
        />
        <link
          href="/src/rss.xml"
          rel="alternate"
          type="application/rss+xml"
          title="Blog RSS feed"
        />
        ${head}
      </head>

      <body>
        ${body} ${colophon}
        <article class="footer-past">
          you got to the end :) this is everything.
        </article>
      </body>
    </html>`;
