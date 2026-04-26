import { HydratedWidget } from "local-fetcher/fetcher";
import { Post } from "../transformer/md/md.t";
import { Shell } from "./internal/Shell";
import { AllWidgets } from "./Widget";

const BlogPost = ({
  post,
  widgets,
}: {
  post: Post;
  widgets: HydratedWidget[];
}) => {
  const head = `
    <meta property="og:image" content="/src/og-image-fallback.png" />
    <meta property="og:title" content="${post.meta.title}" />
`;

  const accessory = `
    <a
        class="header-scream"
        href="https://bsky.app/search?q=${encodeURIComponent(
          post.meta.permalink,
        )}+from%3Afreezydorito.lol"
        ><small>Done reading?</small> <span>Scream back at me!</span></a
    >`;

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
    post.htmlContent;

  const body = `<div class="article-wrapper">
      <article>
        ${htmlContent}
      </article>
    </div>`;

  const colophon = `
    ${AllWidgets({
      widgets,
    })}
    <article class="article-colophon">
        <p>
          <strong
            >Thanks for coming! if you got thoughts
            <a href="https://bsky.app/search?q=${encodeURIComponent(
              post.meta.permalink,
            )}+from%3Afreezydorito.lol"
              >I have probably posted this on bluesky</a
            >
            and you can respond there! And if I haven't just ping me there or
            <a href="mailto:hi@laura.monster">email me</a>.
          </strong>
        </p>
        <p>
        I don't know how to set up a newsletter but you wake up with back pain and know what an rss feed is <a href="/src/rss.xml">you can sub here</a> and get updates as they come.
        </p>
      </article>
    `;

  return Shell({
    head,
    colophon,
    title: post.meta.title,
    accessory,
    body,
    backHref: "/words",
  });
};

export default BlogPost;
