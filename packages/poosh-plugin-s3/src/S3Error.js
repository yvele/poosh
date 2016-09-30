function isForbidden(inner) {
  return inner && (inner.code === "Forbidden" || inner.statusCode === 403);
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
