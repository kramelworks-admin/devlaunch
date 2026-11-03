import express from "express";

const app = express();
app.use(express.json());

interface startup{
  whoami: string;
  appName: string;
  description: string;
  Date: Date;
  status: string;
}

app.get("/", (req, res) => {
  const startupInfo: startup = {
    whoami: "I am a upstream API for Kramelworks DevLaunch project",
    appName: "Kramelworks DevLaunch API",
    description: "API for Kramelworks DevLaunch project",
    Date: new Date(),
    status: "Running"
  };
  res.json(startupInfo);
});

export { app };
