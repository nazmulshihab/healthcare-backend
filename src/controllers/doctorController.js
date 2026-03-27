// server/controllers/userControllers.js
import { models } from "../config/database.js";

// Example: Get all doctors
// export const getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await models.doctors.findAll({
//       include: [
//         {
//           model: models.doc_sc,
//           as: "doctorSchedules", // alias for association
//           include: [
//             {
//               model: models.schedules,
//               as: "schedule", // alias for schedule
//               attributes: ["id", "days"],
//             },
//           ],
//         },
//       ],
//     });
//     res.status(200).json(doctors);
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await models.doctors.findAll({
      attributes: ["doctor_id", "doctor_name", "specialization", "qualifications"],
      include: [
        {
          model: models.schedules,
          as: "schedules", // MUST MATCH init-models
          attributes: ["id", "days"],
          through: {
            attributes: [] // hides doc_sc fields (clean response)
          }
        }
      ]
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Get a doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await models.doctors.findByPk(id, {
      include: [
        {
          model: models.branches,
          as: "branch",
          attributes: ["location_details"],
        },
        {
          model: models.schedules,
          as: "schedules",
          attributes: ["days"],
          through: {
            attributes: ["time", "slots"], // <-- include time & slots from doc_sc
          },
        },
      ],
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Attach location field for frontend
    res.status(200).json({
      ...doctor.toJSON(),
      location: doctor.branch?.location_details || "Not specified",
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Get a doctor by name
export const getDoctorByName = async (req, res) => {
  try {
    const { name } = req.params;
    const doctor = await models.doctors.findOne({
      where: { doctor_name: name },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    const newDoctor = await models.doctors.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Update a doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await models.doctors.update(req.body, {
      where: { doctor_id: id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedDoctor = await models.doctors.findByPk(id);
    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Example: Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.doctors.destroy({
      where: { doctor_id: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
