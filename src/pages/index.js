import React from "react";
import Layout, { WrapBlock } from "../layout/layout";
import Link, { LinkList } from "./../components/link/link";
import Footer from "./../components/footer/footer";
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
  <Layout>
    <WrapBlock inverted outside={<Stickers />}>
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
      <Footer />
    </WrapBlock>
  </Layout>
);
