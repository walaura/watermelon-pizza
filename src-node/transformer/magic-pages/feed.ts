import { TOP_LEVEL_DOMAIN } from "../../paths";
import listBlogEntries from "../../list-blog-entries";
import { Post } from "../md/md.t";
import { MagicPage } from "./magic-pages";

const makeFeed = (items: Post[]) => `<?xml version="1.0" ?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>Laura's blog!</title>
    <link>${TOP_LEVEL_DOMAIN}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date(689272767 * 1000).toUTCString()}</pubDate>
    <managingEditor>hi@laura.monster (Laura)</managingEditor>
    <webMaster>hi@laura.monster (Laura)</webMaster>
    <ttl>60</ttl>
    <atom:link href="${TOP_LEVEL_DOMAIN}/feed" rel="self" type="application/rss+xml"/>

	${items
    .map(
      (i) => `
		<item>
			<title>${i.meta.title}</title>
			<link>${i.meta.permalink}</link>
			<description>${i.meta.desc ?? i.meta.title}</description>
			<pubDate>${i.meta.date.toUTCString()}</pubDate>
			<guid isPermaLink="true">${i.meta.permalink}</guid>
			<dc:creator>Laura</dc:creator>
			<category>Blog</category>
		</item>
	`,
    )
    .join("")}
  </channel>
</rss>
`;

const feedPage: MagicPage = {
  render: async () => {
    const items = await listBlogEntries();
    return {
      type: "xml",
      content: makeFeed(items),
    };
  },
};

export default feedPage;
