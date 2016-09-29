import crypto from "crypto";
import LocalStatus from "poosh-common/lib/file/LocalStatus";
import zlib from "../promisified/zlib";

/**
 * When content status is labeled as unchanged, buffer doesn't need to be processed.
 */
function shouldSkip(file, rough) {
  // Basically, if rough, any small change should still process the content
  return rough
    ? file.cache.status === LocalStatus.Unchanged
    : file.content.status === LocalStatus.Unchanged;
}

function appendRawContent(file) {
  file.content.buffer = file.src.buffer;
  file.content.size = file.src.size;
  file.content.md5 = file.src.md5;
}

async function appendGzipContent(file) {
  file.content.buffer = await zlib.gzipAsync(file.src.buffer);
  file.content.size = file.content.buffer.length;
  file.content.md5 = crypto
    .createHash("md5")
    .update(file.content.buffer)
    .digest("hex");
}

/**
 * Append content infos that are related to buffer processing.
 *
 * @param file
 * @param rough True if content buffer should also be loaded when headers or
 * remote are changed (or new).
 * @param force Force content to be processed.
 */
export default async function appendContentBuffer(file, rough, force: boolean) {
  if (!force && shouldSkip(file, rough)) {
    return;
  }

  if (file.content.type === "gzip") {
    await appendGzipContent(file);
  } else {
    appendRawContent(file);
  }

  // Release memory when we're done
  file.src.buffer = undefined;
}
