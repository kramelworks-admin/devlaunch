import { log } from "../observability/logger.js";
export function startServer(app, port) {
    app.listen(port, () => {
        log("INFO", "Server started", {
            port,
        });
    });
}
//# sourceMappingURL=server.js.map