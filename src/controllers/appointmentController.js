import { models } from "../config/database.js";

// Helper: get day name from date
const getDayName = (dateString) => {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const date = new Date(dateString);
  return days[date.getDay()];
};

// 1. Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await models.appointments.findAll({
      include: [
        { model: models.patients, as: "patient", attributes: ["patient_name", "gender", "age", "mobile", "email"] },
        { model: models.doctors, as: "doctor", attributes: ["doctor_name", "gender", "specialization", "fee"] },
      ],
      order: [["appointment_date", "ASC"], ["serial_no", "ASC"]],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 2. Get appointment by appointment_id
export const getAppointmentByAppointmentId = async (req, res) => {
  try {
    const { apid } = req.params;
    const appointment = await models.appointments.findByPk(apid, {
      include: [
        { model: models.patients, as: "patient", attributes: ["patient_name", "gender", "age", "mobile", "email"] },
        { model: models.doctors, as: "doctor", attributes: ["doctor_name", "gender", "specialization", "fee"] },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 3. Get appointments by patient_id
export const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { pid } = req.params;
    const appointments = await models.appointments.findAll({
      where: { patientID: pid },
      include: [
        { model: models.doctors, as: "doctor", attributes: ["doctor_name", "specialization", "fee"] },
      ],
      order: [["appointment_date", "ASC"], ["serial_no", "ASC"]],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. Get appointments by doctor_id
export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { did } = req.params;
    const appointments = await models.appointments.findAll({
      where: { doctorID: did },
      include: [
        { model: models.patients, as: "patient", attributes: ["patient_name", "age", "mobile"] },
      ],
      order: [["appointment_date", "ASC"], ["serial_no", "ASC"]],
    });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 5. Create appointment (PATIENT ONLY)
export const createAppointment = async (req, res) => {
  try {
    const { patientID, doctorID, appointment_date } = req.body;

    if (!patientID || !doctorID || !appointment_date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent past date
    const today = new Date();
    const selectedDate = new Date(appointment_date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ message: "Cannot book appointment in the past" });
    }

    // Determine day
    const dayName = getDayName(appointment_date);

    const schedule = await models.schedules.findOne({ where: { days: dayName } });
    if (!schedule) return res.status(400).json({ message: `No schedule for ${dayName}` });

    const docSchedule = await models.doc_sc.findOne({
      where: { doc_id: doctorID, sc_id: schedule.id },
    });

    if (!docSchedule) {
      return res.status(400).json({ message: "Doctor not available on this day" });
    }

    const bookedCount = await models.appointments.count({
      where: { doctorID, appointment_date },
    });

    if (bookedCount >= docSchedule.slots) {
      return res.status(400).json({ message: "No slots available" });
    }

    const serial_no = bookedCount + 1;

    const newAppointment = await models.appointments.create({
      patientID,
      doctorID,
      appointment_date,
      appointment_time: null, // IMPORTANT
      serial_no,
      status: "Pending",
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 6. Doctor responds (Accept / Reject + assign time)
export const respondToAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, appointment_time } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Accepted or Rejected",
      });
    }

    const appointment = await models.appointments.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Prevent re-processing
    if (appointment.status !== "Pending") {
      return res.status(400).json({
        message: "Appointment already processed",
      });
    }

    // If accepted → time required
    if (status === "Accepted" && !appointment_time) {
      return res.status(400).json({
        message: "Appointment time required when accepting",
      });
    }

    const updatedData = {
      status,
      appointment_time: status === "Accepted" ? appointment_time : null,
    };

    await models.appointments.update(updatedData, {
      where: { appointment_id: id },
    });

    const updatedAppointment = await models.appointments.findByPk(id);

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error responding to appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 7. Delete
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await models.appointments.destroy({
      where: { appointment_id: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};