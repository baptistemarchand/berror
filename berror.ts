import * as logMod from "https://deno.land/std/log/mod.ts";
import { LogLevel } from "https://deno.land/std/log/levels.ts";
import { Logger } from "https://deno.land/std/log/logger.ts";

export type Level = "debug" | "verbose" | "info" | "warning" | "error"
  | "critical";

function levelToNumber(level: Level): number {
  switch (level) {
    case "debug":
      return LogLevel.DEBUG;
    case "verbose":
      return LogLevel.VERBOSE;
    case "info":
      return LogLevel.INFO;
    case "warning":
      return LogLevel.WARNING;
    case "error":
      return LogLevel.ERROR;
    case "critical":
      return LogLevel.CRITICAL;
  }
}

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

  log({ level, logger }: { level?: Level; logger?: Logger} = {}) {
    logger = logger ?? logMod.getLogger();
    level = level ?? "error" 
    logger._log(levelToNumber(level), this.message, this.metadata);
  }
}