import fs from "fs";

export default function pathExists (path: string): boolean {
  try {
    fs.lstatSync(path);
  } catch (e) {
    return false;
  }

  return true;
}
