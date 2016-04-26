import path from "path";
import getPrefix from "./getPrefix";

function getPlatform () {
  return process.platform;
}

/**
 * Get global node_modules path.
 *
 * @returns Path to the global node_modules.
 */
export default function getGlobalPath (): string {
  const prefix = getPrefix();
  const onWindows = getPlatform() === "win32";

  // Global installs on Unix systems go to {prefix}/lib/node_modules.
  // Global installs on Windows go to {prefix}/node_modules
  // See https://docs.npmjs.com/files/folders#node-modules
  return onWindows
    ? path.join(prefix, "node_modules")
    : path.join(prefix, "lib", "node_modules");
}
