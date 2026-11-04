const service = "devlaunch-api";
export function log(level, message, context = {}) {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        service,
        message,
        ...context,
    };
    console.log(JSON.stringify(entry));
}
//# sourceMappingURL=logger.js.map