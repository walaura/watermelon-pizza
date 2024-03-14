import React from "react";

import { root } from "./footer.module.css";

const LinkBlank = ({ href, children }) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    href={href}
    title="Opens in a new window"
  >
    {children}
  </a>
);

export default () => (
  <footer className={root}>
    <strong>Kthxbye!</strong> If you wanna get in touch you&nbsp;can
    drop me a line via{" "}
    <LinkBlank href="mailto:hi@laura.monster">email</LinkBlank> or add me on{" "}
    <LinkBlank href="http://linkedin.com/in/walaura">LinkedIn</LinkBlank>.
    <section>
      <ul>
        <li>
          ©{new Date().getFullYear()}
        </li>
        <li>
          <LinkBlank href="https://github.com/walaura/watermelon-pizza">
            Source
          </LinkBlank>
        </li>
        <li>
          <a href="/old/index.html" title="Older versions of this website">
            Sssh
          </a>
        </li>
      </ul>
    </section>
  </footer>
);
