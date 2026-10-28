import { app } from "./http/app.js";
import { startServer } from "./http/server.js";
function bootStrap() {
    startServer(app, 3000);
}
bootStrap();
//# sourceMappingURL=main.js.map