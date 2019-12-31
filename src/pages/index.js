import React from "react";
import Layout from "../components/layout";

export default () => (
  <Layout hasThings>
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
    <nav className="links">
      <ul>
        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://twitter.com/freezydorito"
            title="Opens in a new window"
          >
            <span>Comedy & tragedy</span>
            <strong>Twitter</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://github.com/walaura"
            title="Opens in a new window"
          >
            <span>Code</span>
            <strong>GitHub</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://dev.to/walaura"
            title="Opens in a new window"
          >
            <span>Writing</span>
            <strong>Dev.to</strong>
          </a>
        </li>
        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://www.behance.net/walaura"
            title="Opens in a new window"
          >
            <span>Photos</span>
            <strong>Behance</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://flickr.com/lawwrr"
            title="Opens in a new window"
          >
            <span>Photos too</span>
            <strong>Flickr</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://glitch.com/@walaura"
            title="Opens in a new window"
          >
            <span>Code, but running</span>
            <strong>Glitch</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://www.redbubble.com/people/evswhatevs/shop"
            title="Opens in a new window"
          >
            <span>Some of these stickers</span>
            <strong>Redbubble</strong>
          </a>
        </li>

        <li>
          <a
            rel="noopener"
            target="_blank"
            href="https://walaura.itch.io"
            title="Opens in a new window"
          >
            <span>Games</span>
            <strong>Itch.io</strong>
          </a>
        </li>
      </ul>
    </nav>
    <footer>
      <strong>Kthxbye!</strong> If you wanna get in touch with me, you&nbsp;can
      drop me a line via{" "}
      <a
        rel="noopener"
        target="_blank"
        href="mailto:hi@laura.monster"
        title="Opens in a new window"
      >
        email
      </a>{" "}
      or add me on{" "}
      <a
        rel="noopener"
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
            ©<x-year></x-year> me lol (
            <a
              rel="noopener"
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
              rel="noopener"
              target="_blank"
              href="https://github.com/walaura/watermelon-pizza"
              title="Opens in a new window"
            >
              check out the source code
            </a>
          </li>
          <li>
            <a
              href="https://www.lauragonzalez.cc/old/index.html"
              title="Older versions of this website"
            >
              sssh
            </a>
          </li>
        </ul>
      </section>
    </footer>
  </Layout>
);
