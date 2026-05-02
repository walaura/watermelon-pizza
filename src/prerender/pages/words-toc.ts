import { html } from "common-tags";
import { Shell } from "#src/prerender/pages/shell.ts";
import { footerNav } from "#src/prerender/components/footer-nav/footer-nav.ts";
import { objectivelyCorrectDateFormat } from "#src/js/lib/dates.ts";
import { withOwnStyles } from "#prerender/use-link.ts";
import type { Post } from "../parse-md.ts";

const postsByMonth = (posts: Post[]): Map<string, Post[]> => {
  const months = new Map();
  for (const post of posts) {
    const month = post.meta.date.toLocaleDateString("en-US", {
      month: "long",
      year:
        new Date().getFullYear() !== post.meta.date.getFullYear()
          ? "numeric"
          : undefined,
    });
    if (!months.has(month)) {
      months.set(month, []);
    }
    months.set(month, [...months.get(month), post]);
  }
  return months;
};

const makeList = (posts: Post[]) =>
  posts.map(
    (item) =>
      html`<li>
        <a href="${item.meta.permalink}">${item.meta.title}</a><br />${item.meta
          .desc
          ? `${item.meta.desc}`
          : ""}
        <small>${objectivelyCorrectDateFormat(item.meta.date)}</small>
      </li>`,
  );

const makeSection = (title: string, posts: string[]) => html`
  <div class="toc-section">
    <h2>${title}</h2>
    <ul>
      ${posts}
    </ul>
  </div>
`;

const wordsTocPage = ({ posts: allPosts }: { posts: Post[] }) => {
  const allPostsByMonth = postsByMonth(allPosts);
  let sec = "";
  allPostsByMonth.forEach(
    (posts, key) => (sec += makeSection(key, makeList(posts))),
  );

  const body = html`<div class="toc-heading 🧃-glitchbox">
      <div class="toc-width">
        <h1>
          Hey you made it to my blog! Thanks for coming – check out all
          ${allPosts.length} posts.
        </h1>
      </div>
    </div>
    <div class="toc-wrapper">
      <div class="toc-width">${sec}</div>
    </div>
    ${footerNav({
      backHref: "/",
      backHrefTitle: "Back to the links",
    })} `;

  return Shell({
    head: withOwnStyles(import.meta.filename),
    title: "Words",
    body,
  });
};

export default wordsTocPage;
