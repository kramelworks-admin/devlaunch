import express from "express";

const app = express();
app.use(express.json());

interface startup {
  appName: string;
  description: string;
  Date: Date;
  status: string;
}

async function getDate(uri: string) {
  const response = await fetch(uri);
  const data = await response.json();
  return data;
}

const apiUrl = process.env.API_URL || "http://127.0.0.1:8001";

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
    const date = await getDate(apiUrl);
    res.json({ status: date.status });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from upstream API" });
  }
});

app.get("/upstream/info", async (req, res) => {
  try {
    const date = await getDate(apiUrl);
    res.json(date);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from upstream API" });
  }
});

export { app };
