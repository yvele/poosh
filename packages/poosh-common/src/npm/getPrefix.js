import { execSync } from "child_process";

/** Global NPM path */
let prefixCache;

/**
 * Get the NPM global path.
 *
 * @returns The global NPM path.
 */
export default function getPrefix(): string {
  if (!prefixCache) {
    prefixCache = execSync("npm config get prefix", {
      encoding: "utf-8"
    }).trim();
  }

  return prefixCache;
}
