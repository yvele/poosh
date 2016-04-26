import path from "path";
import Module from "module";
import getPrefix from "../npm/getPrefix";
import pathExists from "../fs/pathExists";

const relativeModulesCache = {};

/**
 * @param loc Module location (or module name).
 * @param relative The directory where to resolve the module from.
 * @returns Module path or null if not found.
 */
function resolveRelative (loc: string, relative: string): ?string {

  let relativeMod = relativeModulesCache[relative];
  if (!relativeMod) {
    relativeMod = new Module();
    // eslint-disable-next-line no-underscore-dangle
    relativeMod.paths = Module._nodeModulePaths(relative);
    relativeModulesCache[relative] = relativeMod;
  }

  try {
    // eslint-disable-next-line no-underscore-dangle
    return Module._resolveFilename(loc, relativeMod);
  } catch (err) {
    return null;
  }
}

/**
 * Resolve a globally installed module from it's name.
 */
function resolveGlobal (moduleName: string): ?string {
  let modulePath = path.join(getPrefix(), "lib", "node_modules", moduleName);
  return pathExists(modulePath) ? modulePath : null;
}

/**
 * @param loc Module location (or module name).
 * @param relative The directory where to resolve the module from.
 * @returns Module path or null if not found.
 */
export default function (loc: string, relative: string): ?string {
  return resolveRelative(loc, relative)
    || resolveGlobal(loc);
}
