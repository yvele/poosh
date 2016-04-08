import Promise from "bluebird";
import fs from "fs";

const METHODS = ["readFile", "realpath"];

Promise.promisifyAll(fs, method => METHODS.indexOf(method) !== -1);

export default fs;
