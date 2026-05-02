import { PARCEL_SRC_ROOT } from "#/paths.ts";
import { Shell } from "#src/prerender/pages/shell.ts";
import { Dirent } from "fs";
import { html } from "#prerender/sys/tags.ts";
import type { HydratedWidget } from "local-fetcher/widgets";
import path from "path";
import { readdir, readFile } from "fs/promises";
import { footerNav } from "#prerender/components/footer-nav/footer-nav.ts";
import { widgetsRow } from "#prerender/components/widgets/widgets-row.ts";
import type { Post } from "../parse-md.ts";

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

  const backLine = html`<article>
    <p>
      <strong>Thanks for coming!</strong> if you got thoughts
      <a
        href="https://bsky.app/search?q=${encodeURIComponent(
          post.meta.permalink,
        )}+from%3Afreezydorito.lol"
        >I have probably posted this on bluesky</a
      >
      and you can respond there! And if I haven't just ping me there or
      <a href="mailto:hi@laura.monster">email me</a>.
    </p>
  </article>`;

  const body = html`<div class="🧃-glitchbar"></div>
    <div class="article-wrapper">
      <article>${htmlContent}</article>
      ${backLine}
    </div>`;

  const colophon = html`
    ${footerNav({
      accessoryEnd,
      backHref: "/words",
    })}
    ${widgetsRow({
      widgets,
    })}
    <article class="article-colophon">
      <p>
        I don't know how to set up a newsletter but if you wake up with back
        pain and thus know what an rss feed is
        <a href="/src/rss.ts">you can sub here</a> and get updates as they come.
      </p>
    </article>
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
