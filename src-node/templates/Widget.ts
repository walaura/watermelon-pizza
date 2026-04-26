import { HydratedWidget } from "local-fetcher/fetcher";
import { objectivelyCorrectDateFormat } from "../dates";

const WIDGET_NAMES: {
  [key in HydratedWidget["name"]]: string;
} = {
  bluesky: "Skeeted before when this was posted",
  "steam-last-game": `I've been playing this`,
  weather: `Weather at time of posting`,
  "yt-top-songs": `Some banging tunes`,
};

const WidgetRenderer = (widget: HydratedWidget) => {
  if (widget.error) {
    return `<div class="colophon-widget">
    <h3>${WIDGET_NAMES[widget.name]}</h3><p>Lol this failed to load?? lmk</div>`;
  }
  const title = WIDGET_NAMES[widget.name];

  if (widget.name == "bluesky") {
    widget.data.date = new Date(widget.data.date);
    return `
    <div class="colophon-widget">
      <h3>${title}</h3>
      <p>${widget.data.text}</p>
      <small class="colophon-widget-flex">
        <span>${widget.data.date.toLocaleTimeString()} - ${objectivelyCorrectDateFormat(widget.data.date)}</span>
        <a href="${widget.data.url}">Check it out</a>
      </small>
    </div>
    `;
  }

  if (widget.name == "weather") {
    return `
    <div class="colophon-widget">
      <h3>${title}</h3>
      <div class="colophon-widget-flex">
        <div class="colophon-widget-big-number">
          ${widget.data.temp[0]}
          <small>F</small>
        </div>
        <div class="colophon-widget-big-number">
          ${widget.data.temp[1].toFixed(1)}
          <small>C</small>
        </div>
        <div>
          <small>MOON</small>
          <p>${widget.data.moon}</p><br/><br/>
          <small>SUNSET</small>
          <p>${widget.data.sunsetAt}</p><br/><br/>
        </div>
      </div>
    </div>
    `;
  }

  return `
  <div class="colophon-widget">
    <h3>${WIDGET_NAMES[widget.name]}</h3>
    <p>sorry im an idiot and never wrote this. heres the data, just imagine it:</p>
    <pre>${JSON.stringify(widget.data, null, 2)}</pre>
  </div>
    `;
};

export const AllWidgets = ({ widgets }: { widgets: HydratedWidget[] }) => {
  return `
  <link rel="stylesheet" href="/src/css/widgets.css" />
  <div class="colophon-widgets 🧃-glitchbox">${widgets.map(WidgetRenderer).join("")}</div>`;
};
