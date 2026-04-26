import * as json from "../../src/widget-data/1777185000.json";

type Widget = typeof json;

const WidgetRenderer = (widget) => {
  return `
    <pre>{widget}</pre>
    `;
};

const AllWidgets = (widgets) => {
  return `<link rel="stylesheet" href="/src/css/widgets.css" /><div>${widgets.map(
    WidgetRenderer,
  )}</div>`;
};
