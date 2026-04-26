import type { FetchFrom, Widget } from "./widget.d.ts";
import htmlToJson from "html-to-json";

const fetchFrom: FetchFrom = [
  new URL("https://weather.yahoo.com/gb/england/london/"),
  {},
];

const convertToCelsius = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const weatherWidget: Widget<
  "weather",
  {
    temp: [fah: number, celsius: number];
    type: string;
  }
> = {
  fetchFrom,
  name: "weather",
  unmangle: async (string) => {
    const { fah, type, sunsetAt, moon } = await htmlToJson.batch(string, {
      fah: htmlToJson.createMethod((doc) => {
        return parseInt(
          doc.find("[aria-label='Current temperature'] > *").first().text(),
          10,
        );
      }),
      type: htmlToJson.createMethod((doc) => {
        return doc
          .find("[aria-label='Current temperature'] svg")
          .first()
          .attr("aria-label");
      }),
      sunsetAt: htmlToJson.createMethod((doc) => {
        return doc.find("div[aria-label='Sunset']").first().text();
      }),
      moon: htmlToJson.createMethod((doc) => {
        const label = doc
          .find("p:contains('Moon')")
          .closest(`div[role="listitem"]`)
          .text()
          .replace("Moon", "");
        return label;
      }),
    });

    return {
      temp: [fah, convertToCelsius(fah)],
      type,
      sunsetAt,
      moon,
    };
  },
};

export default weatherWidget;
