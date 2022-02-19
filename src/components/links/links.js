import React from 'react';

import styles from './links.module.css';

const ChonkyLink = ({ title, href, subtitle }) => (
	<a
		className={styles.link}
		rel="noopener noreferrer"
		target="_blank"
		href={href}
		title="Opens in a new window">
		<strong>{title}</strong>
		<span>{subtitle}</span>
	</a>
);

const LinkList = ({ children, isList = false }) => (
	<nav className={styles.root} data-is-list={isList}>
		<ul>
			{React.Children.map(children, (child, idx) => (
				<li key={idx}>{child}</li>
			))}
		</ul>
	</nav>
);

export default LinkList;
export { ChonkyLink };
