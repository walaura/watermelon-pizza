import type { Widget } from "./widget.d.ts";

import dotenv from "dotenv";
dotenv.config();

const url = new URL(
  `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API}&steamid=${process.env.STEAM_USER_ID}&format=json`,
);

type RecentSteam = {
  url: string;
  name: string;
  playtime: number;
  iconUrl: string;
};

const steamWidget: Widget<"steam-last-game", RecentSteam[]> = {
  name: "steam-last-game",
  fetchFrom: [url, {}],
  unmangle: async (data) => {
    const results = JSON.parse(data);
    const miniUnmangle = (last: {
      name: any;
      appid: any;
      playtime_forever: any;
      img_icon_url: any;
    }) => {
      return {
        name: last.name,
        url: `https://store.steampowered.com/app/${last.appid}/`,
        iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${last.appid}/${last.img_icon_url}.jpg`,
        playtime: last.playtime_forever,
      };
    };

    return [
      miniUnmangle(results.response.games[0]),
      miniUnmangle(results.response.games[1]),
      miniUnmangle(results.response.games[2]),
      miniUnmangle(results.response.games[3]),
    ];
  },
};

export default steamWidget;
