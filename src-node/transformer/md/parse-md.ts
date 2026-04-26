import { marked } from "marked";

import path from "path";
import { TOP_LEVEL_DOMAIN } from "../../paths";
import { Meta, Post } from "./md.t";

export const parseMd = async (
  filePath: string,
  content: string,
): Promise<Post> => {
  let meta = {};
  let maybeCss = "";
  let maybeGlobalCss = "";

  marked.use({
    renderer: {
      image({ href, title, text }) {
        const img = `<img
              src="${href}"
              alt="${text}" />`;

        if (!text) {
          return img;
        }
        return `
          <figure>
              ${img}
            <figcaption>${text}</figcaption>
          </figure>`;
      },
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);

        return `
          </article-zone-${depth}>
          <article-zone-${depth} class="article-zone">
            <h${depth}>
              ${text}
            </h${depth}>`;
      },
    },
    walkTokens: (token) => {
      if ("date" in meta) {
        return;
      }

      if (token.type === "code" && token.lang === "json") {
        const parsed = JSON.parse(token.text) as any as {
          date: string;
        };
        meta = {
          ...parsed,
          date: new Date(parseInt(parsed.date, 10) * 1000),
          permalink: `${TOP_LEVEL_DOMAIN}/words/${path.basename(
            filePath,
            ".md",
          )}`,
        };
        token.type = "space";
        return;
      }
      if (token.type === "code" && token.lang === "css") {
        maybeCss = token.text;
      }
      if (token.type === "code" && token.lang === "css-glob") {
        maybeGlobalCss = token.text;
      }
      if (!("date" in meta)) {
        token.type = "space";
      }
    },
  });
  const htmlContent = await marked.parse(content);
  if (!("date" in meta)) {
    meta = {
      ...meta,
      date: new Date(0),
    };
  }

  return {
    htmlContent,
    meta: meta as Meta,
    maybeCss,
    maybeGlobalCss,
  };
};
