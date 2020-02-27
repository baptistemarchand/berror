import { BError as Base } from "../berror.ts";
import * as logMod from "https://deno.land/std/log/mod.ts";
import { LogLevel } from "https://deno.land/std/log/levels.ts";
import { Logger } from "https://deno.land/std/log/logger.ts";

export type Level = "debug" | "verbose" | "info" | "warning" | "error" | "critical";

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

export class BError extends Base {
  log({ level, logger }: { level?: Level; logger?: Logger; } = {}) {
    logger = logger ?? logMod.getLogger();
    level = level ?? "error";
    logger._log(levelToNumber(level), this.message, this.metadata);
  }
}


