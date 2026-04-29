import blueskyWidget from "./widget/bluesky.ts";
import steamWidget from "./widget/steam.ts";
import weatherWidget from "./widget/weather.ts";
import type { HydratedWidgetFor } from "./widget/widget.d.ts";
import ytWidget from "./widget/yt.ts";

export const WIDGETS = [
  blueskyWidget,
  steamWidget,
  weatherWidget,
  ytWidget,
] as const;

export type HydratedWidget =
  | HydratedWidgetFor<typeof blueskyWidget>
  | HydratedWidgetFor<typeof weatherWidget>
  | HydratedWidgetFor<typeof steamWidget>
  | HydratedWidgetFor<typeof ytWidget>;
