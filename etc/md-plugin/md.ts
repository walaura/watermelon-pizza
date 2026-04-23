import { marked } from "marked";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//list md files in /words and parse them to html
import * as fs from "fs";
import * as path from "path";

const mdDir = path.join(__dirname, "../../words");
const mdFiles = fs.readdirSync(mdDir).filter((file) => file.endsWith(".md"));

const getAllMdData = () =>
  mdFiles.map((file) => {
    let meta = {};
    let maybeCss = "";

    const filePath = path.join(mdDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    marked.use({
      walkTokens: (token) => {
        if (token.type === "code" && token.lang === "json") {
          meta = JSON.parse(token.text);
          token.type = "space";
          return;
        }
        if (token.type === "code" && token.lang === "css") {
          maybeCss = token.text;
        }
        if (!("date" in meta)) {
          token.type = "space";
        }
      },
    });
    const htmlContent = marked.parse(content);
    return {
      file,
      htmlContent,
      meta,
      maybeCss,
    };
  });

console.log(getAllMdData());

export default getAllMdData;
