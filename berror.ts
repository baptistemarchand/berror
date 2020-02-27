export class BError extends Error {
  constructor(
    msg: string,
    cause?: Error,
    public metadata?: Record<string, unknown>
  ) {
    super(msg);
    if (cause != undefined) {
      const subMessage = cause instanceof Error
        ? cause.message
        : `non-error object thrown: ${JSON.stringify(cause)}`;
      this.message = `${this.message}: ${subMessage}`;
    }
    this.metadata = {
      ...(cause instanceof BError ? cause.metadata : {}),
      ...metadata
    };
  }

  public log(...args: unknown[]) {
    console.error(this.message, this.metadata)
  }
}