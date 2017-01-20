import path from "path";
import Datastore from "./promisified/nedb";

// TODO: Relative or absolute?
const DS_DEFAULT_PERSISTANCE_FILE = path.join(".", ".poosh.cache");
const DS_UPDATE_OPTS = { upsert: true };

/**
* @this LocalCache
* @static
* @private
*/
function getQuery(file: Object): string {
  return { _id: file.dest.absolute };
}

export default class LocalCache {

  constructor(fileName: string) {
    if (!fileName) {
      fileName = DS_DEFAULT_PERSISTANCE_FILE;
    }

    this._db = new Datastore({
      filename: fileName,
      autoload: true
    });
  }

  /**
   * Get file hashes from cache.
   *
   * @param file
   * @returns Hashes (content, headers and remote).
   */
  async get(file: Object): ?Object {
    let doc = await this._db.findOneAsync(getQuery(file));
    if (doc) {
      return { content : doc.c, headers : doc.h, remote  : doc.r };
    }
  }

  /**
   * @param file
   */
  async add(file: Object) {

    // Note: Field names cannot begin by '$' or contain a '.'
    let update = {
      $set: {
        c: file.content.hash,
        h: file.headers.hash,
        r: file.remote.hash
      }
    };

    await this._db.updateAsync(getQuery(file), update, DS_UPDATE_OPTS);
  }

  /**
   *
   */
  flush() {
    this._db.persistence.compactDatafile();
  }

  /**
   * @param files
   * @returns Number of removed items.
   * @this LocalCache
   * @private
   */
  async remove(files: Array<Object>): number {
    return await this._db.removeAsync(
      { $or: files.map(getQuery) },
      { multi: true });
  }
}
