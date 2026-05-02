import { marked } from "marked";
import type { TokenizerAndRendererExtension } from "marked";

import path from "path";
import { TOP_LEVEL_DOMAIN } from "../../paths.ts";
import markedFootnote from "marked-footnote";

export type Meta = {
  date: Date;
  title: string;
  desc: string;
  permalink: string;
  filename: string;
  isDraft: boolean;
};

export type Post = {
  htmlContent: string;
  meta: Meta;
  maybeCss: string | null | undefined;
  maybeGlobalCss: string | null | undefined;
};

const closeZone = (ref: DepthRef) => {
  return {
    name: "closeZone",
    level: "block",
    tokenizer(src) {
      const rule = /^(@@@*(?:\n|$))+/;
      const match = rule.exec(src);
      if (match) {
        const token = {
          type: "closeZone",
          raw: match[0],
          text: match[0].trim(),
          tokens: [],
        };
        return token;
      }
    },
    renderer() {
      ref.__current--;
      return `</article-zone>`;
    },
  } as TokenizerAndRendererExtension;
};

const imageRenderer = () => {
  return {
    name: "image",
    renderer({ href, text }) {
      const img = `<img
          class="image-hanging"
          src="${href}"
          alt="${text}" />`;

      if (!text) {
        return img;
      }
      return `
      <figure>
          ${img.replace("image-hanging", "image-fig")}
        <figcaption>${text}</figcaption>
      </figure>`;
    },
  } as TokenizerAndRendererExtension;
};

const headingRenderer = (previousDepth: DepthRef) => {
  return {
    name: "heading",
    renderer({ tokens, depth }) {
      const delta = previousDepth.__current - depth + 1;
      const text = this.parser.parseInline(tokens || []);
      previousDepth.__current = depth;

      const closers = new Array(delta + 1).fill("").join("</article-zone>");
      return `
      ${closers}
      <article-zone data-depth="${depth}">
        <h${depth}>
          ${text}
        </h${depth}>`;
    },
  } as TokenizerAndRendererExtension;
};

type DepthRef = {
  __current: number;
};

export const parseMd = async (
  filePath: string,
  content: string,
): Promise<Post> => {
  let meta = {};
  let maybeCss = "";
  let maybeGlobalCss = "";

  const previousDepth: DepthRef = {
    __current: 2,
  };

  marked.use(
    {
      extensions: [
        closeZone(previousDepth),
        imageRenderer(),
        headingRenderer(previousDepth),
      ],
      walkTokens: (token) => {
        if ("date" in meta) {
          return;
        }

        if (token.type === "code" && token.lang === "json") {
          const parsed = JSON.parse(token.text) as any as {
            date: string;
            [key: string]: unknown;
          };
          meta = {
            ...parsed,
            isDraft: Boolean(parsed.draft),
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
        if (!("date" in meta) && token.type !== "footnotes") {
          token.type = "space";
        }
      },
    },
    markedFootnote(),
  );

  if (process.env.WMPZ_NO_MD_TEXT == "true") {
    marked.use({
      renderer: {
        text() {
          return "hello";
        },
      },
    });
  }

  let htmlContent = await marked.parse(content);
  htmlContent = htmlContent.replaceAll(
    `<section class="footnotes"`,
    `</article-zone><article-zone data-depth="2" class="footnotes"`,
  );

  if (!("date" in meta)) {
    meta = {
      ...meta,
      date: new Date(0),
    };
  }

  meta = {
    ...meta,
    filename: path.basename(filePath, ".md"),
  };

  return {
    htmlContent,
    meta: meta as Meta,
    maybeCss: process.env.WMPZ_NO_CSS ? null : maybeCss,
    maybeGlobalCss,
  };
};
