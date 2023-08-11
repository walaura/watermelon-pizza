import React from 'react';
import Layout, { WrapBlock } from '../layout/layout';
import LinkList, { ChonkyLink } from './../components/links/links';
import Footer from './../components/footer/footer';
import Stickers from './../components/stickers/stickers';

const links = [
	{
		href: 'https://www.threads.net/@freezydorito',
		subtitle: 'Comedy & tragedy',
		title: 'Threads',
	},
	{
		href: 'https://github.com/walaura',
		subtitle: 'Code',
		title: 'GitHub',
	},
	{
		href: 'https://dev.to/walaura',
		subtitle: 'Writing',
		title: 'Dev.to',
	},
	{
		href: 'https://www.behance.net/walaura',
		subtitle: 'Photos',
		title: 'Behance',
	},
	{
		href: 'https://flickr.com/lawwrr',
		subtitle: 'Photos too',
		title: 'Flickr',
	},
	{
		href: 'https://glitch.com/@walaura',
		subtitle: 'Code, but running',
		title: 'Glitch',
	},
	{
		href: 'https://www.redbubble.com/people/evswhatevs/shop',
		subtitle: 'Some of these stickers',
		title: 'Redbubble',
	},
	{
		href: 'https://walaura.itch.io/',
		subtitle: 'Games',
		title: 'Itch.io',
	},
	{
		href: 'https://x.com/freezydorito',
		subtitle: 'Man remember Twitter',
		title: 'X',
	},
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
				<div className="subintro">
					I'm helping make the web awesome at{' '}
					<s title="miss em everyday">TNW</s>{' '}
					<s title="oh man this was an interesting one">The Guardian</s>{' '}
					<s title="ITS NOT A PHASE MOM">Facebook</s>{' '}
					<em title="cursing web browsers with ui infra">
						Meta
					</em>
					, and&nbsp;in my free time I'm up to a lot:
				</div>
			</div>
			<LinkList>
				{links.map((l) => (
					<ChonkyLink key={l.href} {...l} />
				))}
			</LinkList>
			<Footer />
		</WrapBlock>
	</Layout>
);
