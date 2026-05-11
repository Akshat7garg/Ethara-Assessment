import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import userRoute from './routes/user.route.js'
import projectRoute from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

app.use('/api/v1/user', userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!!!"
    });
});

app.use((err: any, _req: any, res: any, _next: any) => {
    const statusCode = err.statusCode || 500;

    const message =
        err.message ||
        "Internal server error, try again!!!";

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.error || []
    });
});

export default app;