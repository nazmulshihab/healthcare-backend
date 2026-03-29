import cors from "cors";
import express from "express";

import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("API is working. Client URL: " + process.env.CLIENT_URL);
});

app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);

export default app;
