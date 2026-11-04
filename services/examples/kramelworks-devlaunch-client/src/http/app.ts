import express from "express";
import { config } from "../config/env.js";
import { log } from "../observability/logger.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const requestId = crypto.randomUUID();

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

interface startup {
  appName: string;
  description: string;
  Date: Date;
  status: string;
}

async function getDate(uri: string, requestId: string) {
  const response = await fetch(uri, {
    headers: {
      "X-Request-Id": requestId,
    },
    signal: AbortSignal.timeout(config.requestTimeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Upstream returned HTTP ${response.status}`);
  }

  return response.json();
}

const apiUrl = config.apiUrl;

app.get("/", (req, res) => {
  const startupInfo: startup = {
    appName: "Kramelworks DevLaunch API Client",
    description: "Consumer API for Kramelworks DevLaunch project",
    Date: new Date(),
    status: "Running",
  };
  res.json(startupInfo);
});

app.get("/upstream", async (req, res) => {
  try {
    const date = await getDate(apiUrl, req.requestId);
    res.json({ status: date.status });
  } catch (error) {
    log("ERROR", "Failed to fetch upstream API", {
      requestId: req.requestId,
      upstream: apiUrl,
      error: error instanceof Error ? error.message : String(error),
    });

    res.status(500).json({
      error: "Failed to fetch data from upstream API",
      requestId: req.requestId,
    });
  }
});

app.get("/upstream/info", async (req, res) => {
  try {
    const date = await getDate(apiUrl, req.requestId);
    res.json(date);
  } catch (error) {
    log("ERROR", "Failed to fetch upstream API", {
      requestId: req.requestId,
      upstream: apiUrl,
      error: error instanceof Error ? error.message : String(error),
    });

    res.status(500).json({
      error: "Failed to fetch data from upstream API",
      requestId: req.requestId,
    });
  }
});

export { app };
