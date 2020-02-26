export class BError extends Error {
  constructor(
    msg: string,
    cause?: unknown,
    public metadata?: Record<string, unknown>
  ) {
    super(msg + (cause instanceof Error ? `: ${cause.message}` : ""));
    this.metadata = {
      ...(cause instanceof BError ? cause.metadata : {}),
      ...metadata
    };
  }
}
