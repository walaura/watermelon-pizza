import { marked } from "marked";
import { Meta } from "../md";
import path from "path";
import { TOP_LEVEL_DOMAIN } from "../../paths";

export const parseMd = async (
  filePath: string,
  content: string,
): Promise<{
  htmlContent: string;
  meta: Meta;
  maybeCss: string;
}> => {
  let meta = {};
  let maybeCss = "";

  marked.use({
    renderer: {
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
      if (token.type === "code" && token.lang === "json") {
        const parsed = (JSON.parse(token.text) as any) as {
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
  };
};
