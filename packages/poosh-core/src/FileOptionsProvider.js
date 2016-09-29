import merge from "poosh-common/lib/options/merge";
import GlobMatcher from "./helpers/GlobMatcher";

export default class FileOptionsProvider {

  _options: Object;
  _matcher: GlobMatcher;

  constructor(options) {
    this._options = options;
    this._matcher = new GlobMatcher();
  }

  /**
   * @param fileName Relative file path.
   * @returns merged options that matches.
   */
  getOptions(fileName: string): Object {
    let matches = 0;
    let optionsList = [];

    for (let item of this._options.each) {

      if (item.match === undefined || item.match === null) {
        // No pattern means that options are applicable
        // but does not count as a match
        optionsList.push(item);
        continue;
      }

      if (this._matcher.check(fileName, item.match)) {
        optionsList.push(item);
        matches++;
      }
    }

    if (matches < 1) {
      return; // No matches
    }

    // Merge applicable options
    let options = merge({}, ...optionsList);

    Reflect.deleteProperty(options, "match");
    return options;
  }
}
