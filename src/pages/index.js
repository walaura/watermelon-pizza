import React from "react";
import Layout from "../components/layout";
import Link, { LinkList } from "./../components/link/link";
import Stickers from "./../components/stickers/stickers";

const links = [
  {
    href: "https://twitter.com/freezydorito",
    subtitle: "Comedy & tragedy",
    title: "Twitter"
  },
  {
    href: "https://github.com/walaura",
    subtitle: "Code",
    title: "GitHub"
  },
  {
    href: "https://dev.to/walaura",
    subtitle: "Writing",
    title: "Dev.to"
  },
  {
    href: "https://www.behance.net/walaura",
    subtitle: "Photos",
    title: "Behance"
  },
  {
    href: "https://flickr.com/lawwrr",
    subtitle: "Photos too",
    title: "Flickr"
  },
  {
    href: "https://glitch.com/@walaura",
    subtitle: "Code, but running",
    title: "Glitch"
  },
  {
    href: "https://www.redbubble.com/people/evswhatevs/shop",
    subtitle: "Some of these stickers",
    title: "Redbubble"
  },
  {
    href: "https://walaura.itch.io/",
    subtitle: "Games",
    title: "Itch.io"
  }
];

export default () => (
  <Layout inverted outside={<Stickers />}>
    <p className="chip">Hey, hi!</p>
    <div className="intro">
      <h1>
        I'm <strong title="thats two z's">Laura González</strong> –
        an&nbsp;artist, speaker, developer, and overall disgrace.
      </h1>
      I'm helping make the web awesome at{" "}
      <s aria-hidden="true" title="miss em everyday">
        TNW
      </s>{" "}
      <s aria-hidden="true" title="oh man this was an interesting one">
        The Guardian
      </s>{" "}
      <em title="FACEBOOK the company not facebook the app">Facebook</em>,
      and&nbsp;in my free time I'm up to a lot:
    </div>
    <LinkList>
      {links.map(l => (
        <Link key={l.href} {...l} />
      ))}
    </LinkList>
    <footer>
      <strong>Kthxbye!</strong> If you wanna get in touch with me, you&nbsp;can
      drop me a line via{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="mailto:hi@laura.monster"
        title="Opens in a new window"
      >
        email
      </a>{" "}
      or add me on{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="http://linkedin.com/in/walaura"
        title="Opens in a new window"
      >
        LinkedIn
      </a>
      .
      <section>
        <ul>
          <li>
            ©{new Date().getFullYear()} me lol (
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              title="Opens in a new window"
            >
              cc-by-sa
            </a>
            )
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/walaura/watermelon-pizza"
              title="Opens in a new window"
            >
              check out the source code
            </a>
          </li>
          <li>
            <a href="/old/index.html" title="Older versions of this website">
              sssh
            </a>
          </li>
        </ul>
      </section>
    </footer>
  </Layout>
);
