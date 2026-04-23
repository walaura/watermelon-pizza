import { Post } from "../md/md.t";
import { Shell } from "./internal/Shell";

const Toc = ({ posts }: { posts: Post[] }) => {
  const list = posts
    .map(
      item =>
        `<li><a href="${item.meta.permalink}">${
          item.meta.title
        }</a> - ${item.meta.date.toLocaleDateString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })}</li>`
    )
    .join("\n");

  const body = `<div class="article-wrapper">
      <article>
        <ul>${list}</ul>
      </article>
    </div>`;

  return Shell({
    title: "Words",
    body
  });
};

export default Toc;
