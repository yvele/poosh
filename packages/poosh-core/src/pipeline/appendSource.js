import crypto from "crypto";
import path from "path";
import fs from "../promisified/fs";

export default async function appendSource (file: Object) {
  file.src.absolute = path.join(file.src.base, file.src.relative);
  file.src.buffer = await fs.readFileAsync(file.src.absolute);
  file.src.size = file.src.buffer.length;
  file.src.md5 = crypto
    .createHash("md5")
    .update(file.src.buffer)
    .digest("hex");
}
