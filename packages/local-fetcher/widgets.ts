import blueskyWidget from "./widget/bluesky";
import steamWidget from "./widget/steam";
import weatherWidget from "./widget/weather";
import { HydratedWidgetFor } from "./widget/widget";
import ytWidget from "./widget/yt";

export const WIDGETS = [
  blueskyWidget,
  weatherWidget,
  steamWidget,
  ytWidget,
] as const;

export type HydratedWidget =
  | HydratedWidgetFor<typeof blueskyWidget>
  | HydratedWidgetFor<typeof weatherWidget>
  | HydratedWidgetFor<typeof steamWidget>
  | HydratedWidgetFor<typeof ytWidget>;
