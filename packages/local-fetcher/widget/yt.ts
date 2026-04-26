import { INSPECT_MAX_BYTES } from "node:buffer";
import type { Widget } from "./widget";

const MY_BANGING_TUNES = "RDATjuUCIplWlHoqeQW8RA0bvcTC7g";

const baseUrl = "https://youtube.googleapis.com/youtube/v3/playlistItems";
const params = new URLSearchParams({
  part: "snippet,contentDetails,id",
  maxResults: "4",
  playlistId: MY_BANGING_TUNES,
  key: process.env.YT_API || "",
});

const url = new URL(baseUrl);
url.search = params.toString();

type Recent = {
  url: string;
  name: string;
  playtime: number;
};

const ytWidget: Widget<Recent[]> = {
  name: "yt-top-songs",
  fetchFrom: [url, {}],
  unmangle: async (data) => {
    const results = JSON.parse(data);
    const items = results.items.map((item) => {
      const [deets, maybeArtist] = item.snippet.description
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .filter((l) => !l.startsWith("Provided to YouTube by"));

      const deetsHasMiddot = deets.split("·");
      const artist =
        deetsHasMiddot.length > 1 ? deetsHasMiddot.pop().trim() : maybeArtist;

      return {
        song: item.snippet.title,
        artist,
        thumb: item.snippet?.thumbnails?.default?.url ?? null,
        url: `https://youtube.com/watch?v=${item.contentDetails.videoId}&list=${MY_BANGING_TUNES}`,
      };
    });

    return items;
  },
};

export default ytWidget;
