import trim from "lodash/trim";
import looseParseUrl from "poosh-common/lib/url/looseParse";

function parse(host: string, pathname: string): Object {
  if (!host || !pathname) {
    return undefined;
  }

  const regionMath = host.match(/^s3-(.*)\.amazonaws\.com$/i);
  if (!regionMath || regionMath.length !== 2) {
    return undefined;
  }

  const result = {
    type    : "s3",
    region  : regionMath[1].toLowerCase()
  };

  pathname = trim(pathname, "/");
  const slashIndex = pathname.indexOf("/");
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
  const urlObject = looseParseUrl(url);
  if (!urlObject) {
    return undefined;
  }

  return parse(urlObject.host, urlObject.pathname);
}
