import { marked } from "marked";

import path from "path";
import { TOP_LEVEL_DOMAIN } from "../../paths";
import { Meta, Post } from "./md.t";
import markedFootnote from "marked-footnote";

const descriptionList = {
  name: "descriptionList",
  level: "block", // Is this a block-level or inline-level tokenizer?
  start(src) {
    return src.match(/:[^:\n]/)?.index;
  }, // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/; // Regex for the complete token, anchor to string start
    const match = rule.exec(src);
    if (match) {
      const token = {
        // Token to generate
        type: "descriptionList", // Should match "name" above
        raw: match[0], // Text to consume from the source
        text: match[0].trim(), // Additional custom properties
        tokens: [], // Array where child inline tokens will be generated
      };
      this.lexer.inline(token.text, token.tokens); // Queue this data to be processed for inline tokens
      return token;
    }
  },
  renderer(token) {
    return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
  },
};

export const parseMd = async (
  filePath: string,
  content: string,
): Promise<Post> => {
  let meta = {};
  let maybeCss = "";
  let maybeGlobalCss = "";

  let rendererDepth = 0;

  marked.use(
    {
      renderer: {
        hr(rendererThis) {
          rendererThis.rendererDepth--;
          return `</article-zone-${rendererDepth + 1}>`;
        },
        image({ href, title, text }) {
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
        heading({ tokens, depth }) {
          rendererDepth = depth;
          const text = this.parser.parseInline(tokens);

          return `
          </article-zone-${rendererDepth}>
          <article-zone-${rendererDepth} class="article-zone">
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

  let htmlContent = await marked.parse(content);
  htmlContent = htmlContent.replaceAll(
    `<section class="footnotes"`,
    `</article-zone-2><article-zone-2 class="article-zone footnotes"`,
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
    maybeCss,
    maybeGlobalCss,
  };
};
