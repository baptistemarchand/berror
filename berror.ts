export class BError extends Error {
    constructor(msg: string, protected cause?: unknown, protected metadata?: Record<string, unknown>) {
        super(msg + (cause instanceof Error ? `: ${cause.message}` : ''))
    }
}