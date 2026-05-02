import { HydratedWidget } from "local-fetcher/fetcher";

import { html } from "common-tags";
import { objectivelyCorrectDateFormat } from "../../../src-node/dates";

const WIDGET_NAMES: {
  [key in HydratedWidget["name"]]: string;
} = {
  bluesky: "Skeeted before this was posted",
  "steam-last-game": `I've been playing this`,
  weather: `Weather at time of posting`,
  "yt-top-songs": `Some banging tunes I got on repeat`,
};

const WidgetRenderer = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return `
    <div class="widget">
      <h3>${title}</h3>
      ${content}
    </div>
    `;
};

const getWidgetContent = (widget: HydratedWidget) => {
  if (widget.error) {
    return `<p>Lol this failed to load?? lmk</p>`;
  }

  if (widget.name === "yt-top-songs") {
    return `
      <div class="widget-cols">
      ${widget.data
        .map(
          (song) =>
            `<a class="widget-s widget-rows" href="${song.url}" target='_blank'>
              <div class="widget-image" style="
                --img: url('${song.thumb}');
                --scale: 1.4;
              " ></div>
              <strong class="widget-lines-2">${song.song}</strong>
              <span class="widget-alpha widget-s widget-lines-2">${song.artist}</span>
            </a>`,
        )
        .join("")}
      </div>
    `;
  }

  if (widget.name == "steam-last-game") {
    return `
      <div class="widget-cols">
      ${widget.data
        .map(
          (game) =>
            `<a class="widget-s widget-rows" href="${game.url}" target='_blank'>
              <div class="widget-image" style="--img: url('${game.iconUrl}')" ></div>
              <span class="widget-alpha widget-lines-1">${Math.floor(game.playtime / 60)} hours</span>
              <strong class="widget-lines-2">${game.name}</strong>
            </a>`,
        )
        .join("")}
      </div>
    `;
  }

  if (widget.name == "bluesky") {
    widget.data.date = new Date(widget.data.date);
    return `
      <p>${widget.data.text}</p>
      <small class="widget-flex">
        <span>${widget.data.date.toLocaleTimeString()} - ${objectivelyCorrectDateFormat(widget.data.date)}</span>
        <a class="widget-text-link" href="${widget.data.url}">Check it out</a>
      </small>
    `;
  }

  if (widget.name == "weather") {
    return `
      <div class="widget-flex">
        <div class="widget-rows">
          <span class="widget-alpha widget-s">CELSIS</span>
          <div class="widget-big-number">
          ${widget.data.temp[1].toFixed(1)}
          </div>
        </div>
        <div class="widget-rows">
          <span class="widget-alpha widget-s">FAHRIS</span>
          <div class="widget-big-number">
          ${widget.data.temp[0].toFixed(0)}
          </div>
        </div>
        <div class="widget-rows">
          <div class="widget-s">
            <div class="widget-alpha">MOON</div>
            <p>${widget.data.moon}</p>
          </div>
          <div class="widget-s">
            <div class="widget-alpha">SUNSET</div>
            <p>${widget.data.sunsetAt}</p>
          </div>
        </div>
      </div>
    `;
  }

  return html`
    <p>
      sorry im lazy and this widget doesn't have a renderer. heres the data,
      just imagine it:
    </p>
    <pre class="widget-xs">
      ${JSON.stringify((widget as any).data, null, 2)}
    </pre
    >
  `;
};

export const widgetsRow = ({ widgets }: { widgets: HydratedWidget[] }) => {
  return html` <link
      rel="stylesheet"
      href="../components/widgets/widgets-row.css"
    />
    <div class="widgets 🧃-glitchbox">
      ${widgets.map((widget) => {
        return WidgetRenderer({
          title: WIDGET_NAMES[widget.name],
          content: getWidgetContent(widget),
        });
      })}
    </div>`;
};
