import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  getDoctorByName,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// baseurl: api/doctors/ 
doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/name/:name", getDoctorByName); // ✅ FIXED
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", createDoctor);
doctorRouter.put("/:id", updateDoctor);
doctorRouter.delete("/:id", deleteDoctor);

export default doctorRouter;