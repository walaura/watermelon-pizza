import { PARCEL_SRC_ROOT } from "#/paths.ts";
import { Shell } from "#src/prerender/pages/shell.ts";
import { Dirent } from "fs";
import { html } from "#prerender/sys/tags.ts";
import type { HydratedWidget } from "local-fetcher/widgets";
import path from "path";
import { readdir, readFile } from "fs/promises";
import {
  footerNav,
  type FooterNavLink,
} from "#prerender/components/footer-nav/footer-nav.ts";
import { widgetsRow } from "#prerender/components/widgets/widgets-row.ts";
import type { Post } from "../parse-md.ts";
import listBlogEntries from "../list-blog-entries.ts";

const getClosestWidget = async (date: Date): Promise<HydratedWidget[]> => {
  const dirPath = path.join(PARCEL_SRC_ROOT, "widget-data");

  const entries = await readdir(dirPath, { withFileTypes: true });
  const closestFile = (entries
    .map((entry) => {
      const distance = Math.abs(date.getTime() / 1000 - parseInt(entry.name));
      return [entry, distance] as [Dirent, number];
    })
    .sort((a, b) => a[1] - b[1])
    .shift() ?? [])[0];

  if (!closestFile) {
    return [];
  }

  const widget = (
    await readFile(path.join(closestFile.parentPath, closestFile.name))
  ).toString();

  return JSON.parse(widget) as HydratedWidget[];
};

const wordsArticlePage = async (post: Post) => {
  const widgets = await getClosestWidget(post.meta.date);

  const head = html`
    <meta
      property="og:image"
      content="/${post.meta.filename}.pxmd"
    />
    <meta
      property="og:title"
      content="${post.meta.title}"
    />
  `;

  const accessoryEnd = html`<a
    class="header-scream"
    href="https://bsky.app/search?q=${encodeURIComponent(
      post.meta.permalink,
    )}+from%3Afreezydorito.lol"
  >
    <small>Done reading?</small>
    <span>Scream back at me!</span>
  </a>`;

  const dateObj = post.meta.date;
  const dateForHumans = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateForMeta = dateObj.toISOString();

  const htmlContent =
    `<div class="article-heading"><date datetime="${dateForMeta}">${dateForHumans}</date>` +
    `<h1>${post.meta.title}</h1></div>` +
    (post.maybeCss
      ? `<style>.article-wrapper { ${post.maybeCss} }</style>`
      : "") +
    (post.maybeGlobalCss ? `<style>${post.maybeGlobalCss}</style>` : "") +
    post.htmlContent;

  const backLine = html`<article id="footer">
    <p>
      <strong>Thanks for reading!</strong> if you got thoughts
      <a
        href="https://bsky.app/search?q=${encodeURIComponent(
          post.meta.permalink,
        )}+from%3Afreezydorito.lol"
        >I have probably posted this on bluesky</a
      >
      and you can respond there! And if I haven't just ping me there or
      <a href="mailto:hi@laura.monster">email me</a>.
    </p>
    <p>
      <strong>Wanna follow along?</strong> I don't know how to set up a
      newsletter but if you wake up with back pain and thus know what an rss
      feed is <a href="/src/rss.ts">you can sub here</a> and get updates as they
      come.
    </p>
  </article>`;

  const body = html`<div class="🧃-glitchbar"></div>
    <div class="article-wrapper">
      <article>${htmlContent}</article>
      ${backLine}
    </div>`;

  const allArticles = await listBlogEntries();
  const thisArticle = allArticles.findIndex(
    (entry) => entry.meta.permalink === post.meta.permalink,
  );

  const maybePrevArticle = allArticles[thisArticle - 1];
  const maybeNextArticle = allArticles[thisArticle + 1];

  const colophon = html`
    ${footerNav({
      linksStart: [
        maybePrevArticle
          ? {
              icon: "back",
              link: maybePrevArticle.meta.permalink,
              title: maybePrevArticle.meta.title,
              brow: "Posted after this one",
            }
          : undefined,
        {
          icon: "menu",
          link: "/words",
          title: "Index",
          brow: "Everything",
          isCollapsed: true,
        },
      ].filter(Boolean) as FooterNavLink[],
      linksEnd: [
        {
          link: "#footer",
          brow: "Done reading?",
          title: "Like, Comment, Subscribe",
          hasSquiggle: true,
        },
        maybeNextArticle
          ? {
              icon: "fwd",
              link: maybeNextArticle.meta.permalink,
              title: maybeNextArticle.meta.title,
              brow: "Or keep reading this oldie",
            }
          : undefined,
      ].filter(Boolean) as FooterNavLink[],
    })}
    ${widgetsRow({
      widgets,
    })}
    <script
      type="module"
      src="../js/article.ts"
      async
      defer
    ></script>
  `;

  return Shell({
    head,
    colophon,
    title: post.meta.title,
    body,
  });
};

export default wordsArticlePage;
