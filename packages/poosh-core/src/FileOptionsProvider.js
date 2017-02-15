import merge from "poosh-common/lib/options/merge";
import { isNullOrUndefined } from "poosh-common/lib/lang";
import GlobMatcher from "./helpers/GlobMatcher";

export default class FileOptionsProvider {

  constructor(options) {
    this._options = options;
    this._matcher = new GlobMatcher();
  }

  /**
   * @param fileName Relative file path.
   * @returns merged options that matches.
   */
  getOptions(fileName: string): Object {

    const optionsList = this._options.each
      .filter(item => isNullOrUndefined(item.match) || this._matcher.check(fileName, item.match));

    // No pattern means that options are applicable but does not count as a match
    const matches = optionsList.filter(item => !isNullOrUndefined(item.match)).length;
    if (matches < 1) {
      return undefined; // No matches
    }

    // Merge applicable options
    const options = merge({}, ...optionsList);

    Reflect.deleteProperty(options, "match");
    return options;
  }

}
