import express from "express";

const app = express();
app.use(express.json());

interface startup{
  appName: string;
  description: string;
  Date: Date;
  status: string;
}

app.get("/", (req, res) => {
  const startupInfo: startup = {
    appName: "Kramelworks DevLaunch API",
    description: "API for Kramelworks DevLaunch project",
    Date: new Date(),
    status: "Running"
  };
  res.json(startupInfo);
});

export { app };
