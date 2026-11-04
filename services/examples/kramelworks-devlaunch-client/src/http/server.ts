import { log } from "../observability/logger.js";

export function startServer(app: any, port: number) {
  app.listen(port, () => {
    log("INFO", "Server started", { port });
  });
}
