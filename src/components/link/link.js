import React from "react";

import styles from "./link.module.css";

export default ({ title, href, subtitle }) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    href={href}
    title="Opens in a new window"
  >
    <span>{subtitle}</span>
    <strong>{title}</strong>
  </a>
);

export const LinkList = ({ children }) => (
  <nav className={styles.root}>
    <ul>
      {React.Children.map(children, (child, idx) => (
        <li key={idx}>{child}</li>
      ))}
    </ul>
  </nav>
);
