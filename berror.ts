export class BError extends Error {
  constructor(
    msg: string,
    cause?: Error,
    public metadata?: Record<string, unknown>
  ) {
    super(msg)
    // Workaround for https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, BError.prototype)

    if (cause != undefined) {
      const subMessage = cause instanceof Error
        ? cause.message
        : `non-error object thrown: ${JSON.stringify(cause)}`
      this.message = `${this.message}: ${subMessage}`
    }
    this.metadata = {
      ...(cause instanceof BError ? cause.metadata : {}),
      ...metadata
    };
  }

  public log(...args: unknown[]) {
    const noMetadata = !this.metadata || Object.entries(this.metadata).length === 0

    if (noMetadata) {
      console.error(this.message)
    } else {
      console.error(this.message, this.metadata)
    }
  }
}