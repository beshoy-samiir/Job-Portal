import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "../models/config/db.js";
import authRoutes from "../routes/authRoutes.js";
import errroMiddelware from "../middlewares/errorMiddleware.js";
import jobsRoutes from "../routes/jobsRoutes.js";
import userRoutes from "../routes/userRoutes.js";

dotenv.config();

connectDB();




const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);
app.use(jobsRoutes);


app.use(errroMiddelware);

app.get("*", (req, res) => res.send({ error: "invalid url" }))

export default app;