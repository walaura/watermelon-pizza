import { readdirSync } from "fs";
import { DATA_ROOT, TOP_LEVEL_DOMAIN } from "../../paths";
import { MagicPage } from "./magic-pages";

const IndexTpl = (count: number) => {
  return `
    <div>hey welcome to the time capsule</div>

    <div>
      ${Array.from(Array(count).keys())
        .map(index => `<a href="/src/old/${index + 1}.zip">${index + 1}</a>`)
        .join("")}
      <a href="/">NOW</a>
    </div>
 
    <style type="text/css">
      :root {
        background: black;
        color: white;
        font-family: monospace;
      }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      a {
        color: inherit;
        padding: 2em;
        display: inline-block;
        margin: 1em 0.5em;
        font-weight: bold;
        background: white;
        color: black;
      }
    </style>
  `;
};

const oldPage: MagicPage = {
  render: async () => {
    const dirPath = DATA_ROOT + "src/old";

    const entries = await readdirSync(dirPath, { withFileTypes: true });
    const files = entries.filter(
      entry => entry.isFile() && entry.name.endsWith(".zip")
    );

    return {
      type: "html",
      content: IndexTpl(files.length)
    };
  }
};

export default oldPage;
