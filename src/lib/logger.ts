import * as Sentry from "@sentry/nextjs";

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...(context && { context }),
    });
  }

  info(message: string, context?: LogContext) {
    console.log(this.formatMessage("info", message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage("warn", message, context));
    if (typeof window === "undefined") {
      Sentry.captureMessage(message, { level: "warning", extra: context });
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    console.error(this.formatMessage("error", message, { ...context, error }));
    if (typeof window === "undefined") {
      if (error instanceof Error) {
        Sentry.captureException(error, { extra: context });
      } else {
        Sentry.captureMessage(message, { level: "error", extra: { ...context, error } });
      }
    }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === "development") {
      console.debug(this.formatMessage("debug", message, context));
    }
  }
}

export const logger = new Logger();
