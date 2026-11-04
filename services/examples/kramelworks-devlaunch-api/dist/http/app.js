import express from "express";
import { log } from "../observability/logger.js";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    const requestId = req.get("X-Request-Id") || crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader("X-Request-Id", requestId);
    next();
});
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        log("INFO", "HTTP request completed", {
            requestId: req.requestId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
        });
    });
    next();
});
app.get("/", async (req, res) => {
    const startupInfo = {
        whoami: "I am a upstream API for Kramelworks DevLaunch project",
        appName: "Kramelworks DevLaunch API",
        description: "API for Kramelworks DevLaunch project",
        Date: new Date(),
        status: "Running",
    };
    res.json(startupInfo);
});
export { app };
//# sourceMappingURL=app.js.map