// server/controllers/userControllers.js
import { models } from "../config/database.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await models.doctors.findAll({
      attributes: [
        "doctor_id", 
        "doctor_name", 
        "gender",
        "dob",
        "mobile", 
        "email",
        "specialization", 
        "qualifications",
        "joining_date",
        "fee"
      ],
      include: [
        {
          model: models.branches,
          as: "branch",
          attributes: ["branch_id", "location_details"] // ✅ Correct column names from branches model
        },
        {
          model: models.departments,
          as: "dept", // ✅ Using correct alias 'dept'
          attributes: ["dept_id", "dept_name"] // ✅ Correct column names from departments model
        },
        {
          model: models.schedules,
          as: "schedules",
          attributes: ["id", "days"], // ✅ Correct column names from schedules model
          through: {
            attributes: ["time", "slots"] // Include junction table fields if needed
          }
        }
      ],
      order: [
        ['doctor_name', 'ASC']
      ]
    });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No doctors found" 
      });
    }

    res.status(200).json({
      success: true,
      count: doctors.length,
      payload: doctors
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// export const getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await models.doctors.findAll({
//       attributes: ["doctor_id", "doctor_name", "specialization", "qualifications"],
//       include: [
//         {
//           model: models.schedules,
//           as: "schedules", // MUST MATCH init-models
//           attributes: ["id", "days"],
//           through: {
//             attributes: [] // hides doc_sc fields (clean response)
//           }
//         }
//       ]
//     });

//     res.status(200).json(doctors);
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Example: Get a doctor by ID
// export const getDoctorById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const doctor = await models.doctors.findByPk(id, {
//       include: [
//         {
//           model: models.branches,
//           as: "branch",
//           attributes: ["location_details"],
//         },
//         {
//           model: models.schedules,
//           as: "schedules",
//           attributes: ["days"],
//           through: {
//             attributes: ["time", "slots"], // <-- include time & slots from doc_sc
//           },
//         },
//       ],
//     });

//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     // Attach location field for frontend
//     res.status(200).json({
//       ...doctor.toJSON(),
//       location: doctor.branch?.location_details || "Not specified",
//     });
//   } catch (error) {
//     console.error("Error fetching doctor:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await models.doctors.findByPk(id, {
      attributes: [
        "doctor_id", 
        "doctor_name", 
        "gender",
        "dob",
        "mobile", 
        "email",
        "specialization", 
        "qualifications",
        "joining_date",
        "fee"
      ],
      include: [
        {
          model: models.branches,
          as: "branch",
          attributes: ["branch_id", "location_details"] // ✅ Correct column names
        },
        {
          model: models.departments,
          as: "dept", // ✅ Using correct alias
          attributes: ["dept_id", "dept_name"] // ✅ Correct column names
        },
        {
          model: models.schedules,
          as: "schedules",
          attributes: ["id", "days"], // ✅ Correct column names
          through: {
            attributes: ["time", "slots"] // Include junction table fields
          }
        }
      ]
    });

    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        message: "Doctor not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

    res.status(200).json({ success: true, message: "Doctor retrieved successfully", payload: doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDoctorsByDepartment = async (req, res) => {
  try {
    const { deptId } = req.params;
    
    const doctors = await models.doctors.findAll({
      where: { deptID: deptId },
      attributes: [
        "doctor_id", 
        "doctor_name", 
        "specialization", 
        "qualifications",
        "fee"
      ],
      include: [
        {
          model: models.branches,
          as: "branch",
          attributes: ["branch_id", "location_details"]
        },
        {
          model: models.schedules,
          as: "schedules",
          attributes: ["id", "days"],
          through: {
            attributes: ["time", "slots"]
          }
        }
      ],
      order: [['doctor_name', 'ASC']]
    });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No doctors found in this department" 
      });
    }

    res.status(200).json({
      success: true,
      count: doctors.length,
      payload: doctors
    });
  } catch (error) {
    console.error("Error fetching doctors by department:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
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
