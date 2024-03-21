import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
import dbConnection from './database/dbConnection.js';
import userRouter from "./routes/user.routes.js"
import lapyRouter from "./routes/lapy.routes.js"
import { errorMiddleware } from './utils/error.js';

const app = express();
dotenv.config();

// Database Connection
dbConnection();

// Middleware
app.use(cors({
    origin: 'https://laptop-ecommerce-zeta.vercel.app',
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.get("/", (req, res) => {
    res.send("Backend deployed successfully")
})
app.use("/api/v2/user", userRouter); // User Routes
app.use("/api/v2/lapy", lapyRouter); // Admin Routes


app.use(errorMiddleware);

export default app;
