// server/controllers/userControllers.js
import { models } from "../config/database.js";

// Example: Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await models.patients.findAll();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await models.patients.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Create a new patient
export const createPatient = async (req, res) => {
  try {
    const newPatient = await models.patients.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Update a patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.patients.update(req.body, {
      where: { patient_id: id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await models.patients.findByPk(id);
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.patients.destroy({
      where: { patient_id: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
