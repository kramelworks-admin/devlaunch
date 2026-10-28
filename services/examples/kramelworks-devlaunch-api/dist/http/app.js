import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    const startupInfo = {
        appName: "Kramelworks DevLaunch API",
        description: "API for Kramelworks DevLaunch project",
        Date: new Date(),
        status: "Running"
    };
    res.json(startupInfo);
});
export { app };
//# sourceMappingURL=app.js.map