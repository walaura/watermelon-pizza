import { Reporter } from "@parcel/plugin";
import chalk from "chalk";
import { reportInfo, reportYay } from "./dev/helper.ts";

export default new Reporter({
  report({ event }) {
    if (event.type === "buildStart") {
      reportInfo("Rebuilding");
    }
    if (event.type === "buildSuccess") {
      let bundles = event.bundleGraph.getBundles();
      reportYay(
        `Built ${chalk.bold(bundles.length)} bundles in ${chalk.green(event.buildTime + "ms")}`,
      );
    }
  },
});
