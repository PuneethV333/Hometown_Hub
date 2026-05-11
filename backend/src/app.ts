import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHanding } from "./middleware/error.middleware";
import { config } from "./config/data.config";


const app = express()

app.use(morgan("dev"));
app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

app.use(
    cors({
        origin: config.frontendUrl,
        credentials: true,
    }),
);

app.get("/test", (_: Request, res: Response) => {
    res.send("Server is running");
});

app.use((_: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use(errorHanding)


export default app;