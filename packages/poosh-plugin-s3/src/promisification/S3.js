import Promise from "bluebird";
import { S3 } from "aws-sdk";

const METHODS = ["putObject", "headObject", "deleteObjects", "listObjects"];

Promise.promisifyAll(
  Reflect.getPrototypeOf(new S3()),
  method => METHODS.indexOf(method) !== -1);

export default S3;
