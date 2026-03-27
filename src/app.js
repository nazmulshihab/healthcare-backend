import cors from "cors";
import express from "express";

// import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("API is working fine!");
});

app.use("/api/patients", patientRouter);
// app.use("/api/doctors", doctorRouter);

export default app;
