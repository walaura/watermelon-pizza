process.env.NODE_ENV = "development";

// @ts-expect-error
import { emitKeypress } from "emit-keypress";
import { program } from "commander";
import { Parcel } from "@parcel/core";
import pkg from "./package.json" with { type: "json" };
const { DEV_PORT, TOP_LEVEL_DOMAIN } = await import("./src-node/paths.ts");
import chalk from "chalk";
import ora from "ora";
import {
  drawLogo,
  reportEmpty,
  reportInfo,
  reportNay,
} from "./src-node/reporter/dev/helper.ts";

program.option("--no-md-text");
program.option("--no-css");
program.parse();
const opts = program.opts();
const extras: {
  [key: string]: string;
} = {};
if (opts.mdText === false) {
  extras.WMPZ_NO_MD_TEXT = "true";
}
if (opts.css === false) {
  extras.WMPZ_NO_CSS = "true";
}

let bundler = new Parcel({
  entries: pkg.source,
  serveOptions: {
    port: DEV_PORT,
  },
  hmrOptions: {
    port: DEV_PORT + 1,
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  additionalReporters: [
    {
      packageName: "./src-node/reporter/dev.ts",
      resolveFrom: import.meta.filename,
    },
  ],
});

await drawLogo();

reportInfo(`Server started at ${chalk.underline(TOP_LEVEL_DOMAIN)}`);
reportEmpty(chalk.gray(`Hit [up] to show this again, [any] to quit`));
console.log("");

const ks = Object.keys(extras);
for (const key of ks) {
  process.env[key] = extras[key];
  reportInfo(`Added global ${chalk.bold(key)}`);
}
if (ks.length) {
  console.log("");
}

const spinner = ora({
  discardStdin: false,
  text: "Packing up",
  color: "cyan",
}).start();

const ev = await bundler.watch((err, event) => {
  if (err) {
    throw err;
  }
  if (event == null) {
    return;
  }
  spinner.stop();
  if (event.type === "buildFailure") {
    reportNay("Oh no");
    event.diagnostics.map(console.error);
    process.exit(1);
  }
});

emitKeypress({ input: process.stdin });

process.stdin.on("keypress", (input, key) => {
  if (key.name === "up") {
    reportInfo(`Server still at ${chalk.underline(TOP_LEVEL_DOMAIN)}`);
    return;
  }

  ev.unsubscribe();
  process.exit(0);
});
