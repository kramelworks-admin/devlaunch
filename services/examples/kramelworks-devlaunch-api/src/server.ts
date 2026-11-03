import { app } from "./http/app.js";
import { startServer } from "./http/server.js";

function bootStrap() {
  startServer(app, 8001);
}

bootStrap();
