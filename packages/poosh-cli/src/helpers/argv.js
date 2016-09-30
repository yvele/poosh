const commands = ["sync", "upload"];
const defaultCommand = "upload";

function error(...messages: string) {
  const prefix = "\n  ";

  // eslint-disable-next-line no-console
  console.log(prefix + messages.join(prefix));

  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

function parseRemoteCache(val: string, mode: string): Object {
  if (val !== "remote" && val !== "cache") {
    error(
      `error: '${val}' is not a valid value for --${mode} mode.`,
      "Valid values includes 'cache', 'remote' or nothing (to specify both)."
    );
  }

  return {
    remote: val === "remote",
    cache: val === "cache"
  };
}

export function parseReadOnly(val: string): Object {
  return parseRemoteCache(val, "readonly");
}

export function parseForce(val: string): Object {
  return parseRemoteCache(val, "force");
}

/**
 * Parse comma separated values to a string array.
 */
export function parseList(val: string): Array<string> {
  if (!val) {
    return [];
  }

  if (Array.isArray(val)) {
    return val;
  }

  if (typeof val === "string") {
    return val.split(",");
  }

  return [val];
}

export function parseArgs(args: Array): Object {
  if (args.length > 1) {
    error("error: No more than 1 argument allowed.");
  }

  if (args.length === 0) {
    return { subcommand: defaultCommand };
  }

  let subcommand = args[0];
  if (commands.indexOf(subcommand) === -1) {
    error(
      `error: '${subcommand}' is not a valid command.`,
      "Valid values includes 'sync', 'upload' or nothing to use default ('sync')."
    );
  }

  return { subcommand };
}

export function parseEnv(val: string): String {
  return val;
}
