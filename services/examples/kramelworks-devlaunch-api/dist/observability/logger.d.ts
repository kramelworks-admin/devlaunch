type LogLevel = "INFO" | "WARN" | "ERROR";
interface LogContext {
    [key: string]: unknown;
}
export declare function log(level: LogLevel, message: string, context?: LogContext): void;
export {};
//# sourceMappingURL=logger.d.ts.map