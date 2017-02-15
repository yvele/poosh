const FORBIDDEN_STATUS_CODE = 403;

function isForbidden(inner) {
  const { code, statusCode } = inner;
  return code === "Forbidden" || statusCode === FORBIDDEN_STATUS_CODE;
}

export default class S3Error extends Error {

  /**
   * @param {Object} inner AWS inner error
   */
  constructor(inner) {

    let subMessage = inner.message;
    if (!subMessage && isForbidden(inner)) {
      subMessage = "No access (make sure you have access to S3 ressource, and have valid policies)";
    }

    let message = `S3 ${inner.code} (${inner.statusCode})`;
    if (subMessage) {
      message = `${message}: ${subMessage}`;
    }

    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.inner = inner;
  }

}
