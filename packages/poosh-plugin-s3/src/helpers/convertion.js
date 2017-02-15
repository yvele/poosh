export const HEADERS_TO_PARAMS_MAP = {
  "cache-control"       : "CacheControl",
  "content-disposition" : "ContentDisposition",
  "content-encoding"    : "ContentEncoding",
  "content-language"    : "ContentLanguage",
  "content-length"      : "ContentLength",
  "content-md5"         : "ContentMD5",
  "content-type"        : "ContentType",
  expires             : "Expires",
  location            : "WebsiteRedirectLocation"
};

export const FILE_REMOTE_TO_PARAMS_MAP = {
  acl           : "ACL",
  storageClass  : "StorageClass"
};

export function etagToMd5(etag: string): string {
  // Remove leading and trailing " characters
  return etag.substring(1, etag.length - 1);
}
