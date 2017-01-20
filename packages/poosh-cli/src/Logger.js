import logUpdate from "log-update";
import ActionStatus from "poosh-common/lib/file/ActionStatus";
import * as output from "./helpers/output";

const REFRESH_INTERVAL = 700;

/**
 * @this Logger
 * @private
 */
function display() {

  if (this._logBuffer.length) {
    logUpdate.clear();

    // eslint-disable-next-line no-console
    console.log(this._logBuffer.join("\n"));

    this._logBuffer = [];
  }

  logUpdate(this._warningLine
    + output.getMatchingLine(this._status)
    + output.getUploadingLine(this._status)
    + output.getDeletingLine(this._status)
    + output.getStatLine(this._status)
    + output.getElapsedLine(this._status));
}

/**
 * @this Logger
 * @private
 */
function log(line: string) {
  this._logBuffer.push(line);
}

/**
 * @this Logger
 * @private
 */
function logFile(file: Object) {

  let status = this._status;
  let contentSize = file.content.size || 0;

  switch (file.status) {
    case ActionStatus.Created:
      status.stat.creation++;
      status.match.size += file.src.size;
      status.upload.size += contentSize;
      status.upload.count++;
      break;
    case ActionStatus.Updated:
      status.stat.update++;
      status.match.size += file.src.size;
      status.upload.size += contentSize;
      status.upload.count++;
      break;
    case ActionStatus.Deleted:
      status.stat.deletion++;
      status.delete.count++;
      status.delete.size += contentSize;
      break;
    case ActionStatus.Identical:
    case ActionStatus.Unchanged:
      status.stat.unchange++;
      status.match.size += file.src.size;
      break;
    default:
      throw new Error(`Unknown "${file.status}" file status`);
  }

  let line = output.getFileLine(file);
  if (this._verbosity > 1) {
    line += output.getVerboseLines(file, this._verbosity);
  }

  if (file.status !== ActionStatus.Unchanged || this._verbosity) {
    this::log(line);
  }
}

/**
 * @this Logger
 * @private
 */
function logFiles(files: Array<Object>) {
  for (let file of files) {
    this::logFile(file);
  }
}

/**
 * Progress event handler
 *
 * @this Logger
 * @private
 */
function onProgress(task: string, files: Array, done: number, total: number) {
  let status = this._status;

  if (task === "match") {
    status.match.count = done;
    status.match.total = total;
    status.upload.done = status.match.count >= status.match.total;
  } else if (task === "delete") {
    status.delete.done = done >= total;
  }

  if (files) {
    this::logFiles(files);
  }
}

export default class Logger {

  /**
   * @param startTime
   * @param options Normalized options.
   * @param verbosity Verbosity.
   */
  constructor(startTime: Date, options: Object, verbosity: ?number) {
    this._logBuffer = [];
    this._status = {
      startTime,
      "match"  : { count: 0, size: 0, total: 0 },
      "upload" : { count: 0, size: 0, done: null },
      "delete" : { count: 0, size: 0, done: null },
      "stat"   : { creation: 0, update: 0, deletion: 0, unchange: 0 }
    };

    this._warningLine = output.getWarningLine(options);
    this._verbosity = verbosity;
    this._intervalId = undefined;
  }

  /**
   * @param poosh
   */
  listen(poosh: Object) {
    this::display();
    poosh.on("progress", this::onProgress);
    this._intervalId = setInterval(this::display, REFRESH_INTERVAL);
  }

  /**
   *
   */
  logFinish() {
    clearInterval(this._intervalId);
    this::display();
  }
}
