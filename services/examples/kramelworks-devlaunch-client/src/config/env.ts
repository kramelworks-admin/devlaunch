const port = Number(process.env.PORT ?? 8000);
const requestTimeoutMs = Number(process.env.REQUEST_TIMEOUT_MS ?? 3000);

const apiUrl = process.env.API_URL ?? "http://127.0.0.1:8001";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

if (!Number.isFinite(requestTimeoutMs) || requestTimeoutMs <= 0) {
  throw new Error("REQUEST_TIMEOUT_MS must be greater than zero");
}

export const config = {
  port,
  requestTimeoutMs,
  apiUrl,
};
