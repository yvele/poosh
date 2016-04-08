import Promise from "bluebird";
import zlib from "zlib";

Promise.promisifyAll(zlib, method => method === "gzip");

export default zlib;
