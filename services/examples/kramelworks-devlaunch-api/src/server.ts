import { config } from "./config/env.js";
import { app } from "./http/app.js";
import { startServer } from "./http/server.js";

function bootStrap() {
  startServer(app, config.port);
}

bootStrap();
