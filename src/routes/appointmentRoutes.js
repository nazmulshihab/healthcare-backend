import express from "express";
import {
  getAllAppointments,
  getAppointmentByAppointmentId,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  createAppointment,
  respondToAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

// Base URL: api/appointments/

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/id/:apid", getAppointmentByAppointmentId);
appointmentRouter.get("/patient/:pid", getAppointmentsByPatientId);
appointmentRouter.get("/doctor/:did", getAppointmentsByDoctorId);

// Patient creates request
appointmentRouter.post("/create", createAppointment);

// Doctor responds (Accept/Reject + assign time)
appointmentRouter.put("/respond/:id", respondToAppointment);

// Delete
appointmentRouter.delete("/delete/:id", deleteAppointment);

export default appointmentRouter;