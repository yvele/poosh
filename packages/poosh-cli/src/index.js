import "babel-polyfill";
import "loud-rejection/register"; // Make promises to fail loudly
import util from "util";
import main from "./main";

function outputError(err: Object) {
  if (err instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  } else {
    // eslint-disable-next-line no-console
    console.error("Promise rejected with value: " + util.inspect(err));
  }
}

main().catch(err => {
  outputError(err);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
