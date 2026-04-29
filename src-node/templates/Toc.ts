import { Post } from "../transformer/md/md.t";
import { Shell } from "./internal/Shell";

const Toc = ({ posts }: { posts: Post[] }) => {
  const list = posts
    .map(
      (item) =>
        `<li><a href="${item.meta.permalink}">${
          item.meta.title
        }</a><br />${item.meta.desc ? `${item.meta.desc}  &middot;` : ""} <small>${item.meta.date.toLocaleDateString(
          "en-us",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )}<small></li>`,
    )
    .join("\n");

  const body = `<div class="article-wrapper">
      <article>
        <div class="article-heading"><h1>All posts</h1></div>
        <ul>${list}</ul>
      </article>
    </div>`;

  return Shell({
    title: "Words",
    body,
  });
};

export default Toc;
