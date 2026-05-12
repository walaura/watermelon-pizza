"use yummers";

import listBlogEntries from "#prerender/list-blog-entries.ts";
import { TOP_LEVEL_DOMAIN } from "#/paths.ts";
import { html } from "#prerender/sys/tags.ts";
import type { Post } from "#prerender/parse-md.ts";

const makeFeed = (items: Post[]) => html`<?xml version="1.0" ?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>Laura's Blog</title>
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
      (i) => html`
      <item>
          <title>${i.meta.title}</title>
		      <link>${i.meta.permalink}</link>
          <description><![CDATA[ 
            ${i.feedContent}
            <p>There's more! <a href="${i.meta.permalink}">keep reading this way</a>.</p>
          ]]></description>
          <pubDate>${i.meta.date.toUTCString()}</pubDate>
          <guid isPermaLink="true">${i.meta.permalink}</guid>
          <dc:creator>Laura gonzalez</dc:creator>
          <category>Blog</category>
        </item>
      `,
    )
    .join("")}
  </channel>
</rss>
`;

const feedPage = async () => {
  const items = await listBlogEntries();
  return makeFeed(items);
};

export const ASSET_TYPE = "xml";

export default feedPage;
