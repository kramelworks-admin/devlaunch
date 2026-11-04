type LogLevel = "INFO" | "WARN" | "ERROR";

interface LogContext {
  [key: string]: unknown;
}

const service = "devlaunch-api";

export function log(
  level: LogLevel,
  message: string,
  context: LogContext = {},
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
    ...context,
  };

  console.log(JSON.stringify(entry));
}
