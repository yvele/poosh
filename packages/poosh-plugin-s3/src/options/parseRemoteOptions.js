import trim from "lodash/trim";
import looseParseUrl from "poosh-common/lib/url/looseParse";

function parse(host: string, pathname: string): Object {
  if (!host || !pathname) {
    return;
  }

  let regionMath = host.match(/^s3-(.*)\.amazonaws\.com$/i);
  if (!regionMath || regionMath.length !== 2) {
    return;
  }

  let result = {
    type: "s3",
    region: regionMath[1].toLowerCase()
  };

  pathname = trim(pathname, "/");
  let slashIndex = pathname.indexOf("/");
  if (slashIndex === -1) {
    result.bucket = pathname;
    return result;
  }

  result.bucket = pathname.substr(0, slashIndex);
  result.basePath = pathname.substr(slashIndex + 1);
  return result;
}

/**
 * Parse remote options from a single URL.
 */
export default function parseRemoteOptions(url: string): ?Object {
  let urlObject = looseParseUrl(url);
  if (urlObject) {
    return parse(urlObject.host, urlObject.pathname);
  }
}
