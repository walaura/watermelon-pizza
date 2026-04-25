import type { Widget } from "./widget.d.ts";

const url = new URL(
  `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API}&steamid=${process.env.STEAM_USER_ID}&format=json`,
);

const steamWidget: Widget<{
  url: string;
  name: string;
  playtime: number;
}> = {
  name: "steam-last-game",
  fetchFrom: [url, {}],
  unmangle: async (data) => {
    const results = JSON.parse(data);
    console.log(results.response.games[0]);
    const last = results.response.games[0];

    return {
      name: last.name,
      url: `https://store.steampowered.com/app/${last.appid}/`,
      playtime: last.playtime_forever,
    };
  },
};

export default steamWidget;
