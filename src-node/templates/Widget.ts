import { HydratedWidget } from "local-fetcher/fetcher";
import { objectivelyCorrectDateFormat } from "../dates";

const WIDGET_NAMES: {
  [key in HydratedWidget["name"]]: string;
} = {
  bluesky: "Skeeted before this was posted",
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
        ${widget.data.temp[1].toFixed(1)}
        <span class="colophon-widget-xs colophon-widget-alpha">c</span>
        </div>
        <div class="colophon-widget-big-number">
          ${widget.data.temp[0]}
          <span class="colophon-widget-xs colophon-widget-alpha">f</span>
        </div>
        <div class="colophon-widget-flex">
          <div class="colophon-widget-s">
            <div class="colophon-widget-alpha">MOON</div>
            <p>${widget.data.moon}</p>
          </div>
          <div class="colophon-widget-s">
            <div class="colophon-widget-alpha">SUNSET</div>
            <p>${widget.data.sunsetAt}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  return `
  <div class="colophon-widget">
    <h3>${WIDGET_NAMES[widget.name]}</h3>
    <p>sorry im lazy and this widget doesnt have a renderer. heres the data, just imagine it:</p>
    <pre class="colophon-widget-xs">${JSON.stringify(widget.data, null, 2)}</pre>
  </div>
    `;
};

export const AllWidgets = ({ widgets }: { widgets: HydratedWidget[] }) => {
  return `
  <link rel="stylesheet" href="/src/css/widgets.css" />
  <div class="colophon-widgets 🧃-glitchbox">${widgets.map(WidgetRenderer).join("")}</div>`;
};
