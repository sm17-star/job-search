import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobsRouter from "./routes/jobs.routes.js";
import applicationRouter from "./routes/application.routes.js";
import aiRouter from "./routes/ai.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/ai", aiRouter);

const port = process.env.PORT || 9000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.log("DB connection error", err));