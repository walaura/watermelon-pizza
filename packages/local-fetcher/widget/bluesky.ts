import type { Widget } from "./widget.d.ts";

const baseUrl =
  "https://shiitake.us-east.host.bsky.network/xrpc/com.atproto.repo.listRecords";
const params = new URLSearchParams({
  repo: "did:plc:7zxb4jzotsbgdppi52ikz3ur",
  collection: "app.bsky.feed.post",
  limit: "10",
});
const url = new URL(baseUrl);
url.search = params.toString();

const blueskyWidget: Widget<
  "bluesky",
  {
    url: string;
    text: string;
    date: Date;
  }
> = {
  name: "bluesky",
  fetchFrom: [url, {}],
  unmangle: async (data) => {
    const results = JSON.parse(data);
    const firstResultNoReplies = results.records.find(
      (r) => r.value?.reply?.parent == undefined,
    );
    const twoot = firstResultNoReplies ?? results.records[0];

    const [_, __, username, ___, postId] = (twoot.uri as string).split("/");
    const url = `https://bsky.app/profile/${username}/post/${postId}`;
    const { text } = twoot.value;
    const date = new Date(twoot.value.createdAt);
    const hasMedia = twoot.value.embed !== null;

    return { url, text, date, hasMedia };
  },
};

export default blueskyWidget;
