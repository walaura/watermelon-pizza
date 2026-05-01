import { Post } from "../transformer/md/md.js";
import { Shell } from "./internal/Shell.ts";

const Toc = ({ posts }: { posts: Post[] }) => {
  const list = posts
    .map(
      (item) =>
        `<li><a href="${item.meta.permalink}">${
          item.meta.title
        }</a><br />${item.meta.desc ? `${item.meta.desc}` : ""} <small>${item.meta.date.toLocaleDateString(
          "en-us",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )}</small></li>`,
    )
    .join("\n");

  const section = (title, posts) => `
    <div class="toc-section">
      <h2>${title}</h2>
      <ul>${posts}</ul>
    </div>
    `;

  const body = `
  <div class="toc-heading 🧃-glitchbox">
    <div class="toc-width">
      <h1>Hey you made it to my blog! Thanks for coming – check out all ${posts.length} posts.</h1>
    </div>
  </div>
  <div class="toc-wrapper">
    <div class="toc-width">
        ${section("Everything", list)}
      </div>
    </div>`;

  return Shell({
    head: `<link rel="stylesheet" href="/src/css/toc.css" />`,
    title: "Words",
    body,
  });
};

export default Toc;
