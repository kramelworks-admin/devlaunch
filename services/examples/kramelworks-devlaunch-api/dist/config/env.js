const port = Number(process.env.PORT ?? 8001);
const nodeEnv = process.env.NODE_ENV ?? "development";
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid port number");
}
export const config = {
    port,
    nodeEnv,
};
//# sourceMappingURL=env.js.map