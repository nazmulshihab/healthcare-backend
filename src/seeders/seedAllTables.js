// // server/src/seedAllTables.js
// import { faker } from "@faker-js/faker";
// import { models, sequelize } from "../config/database.js";

// const NUM_RECORDS = 10;

// const seedBranches = async () => {
//   const branchesData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     branchesData.push({
//       // location_id: i + 1,
//       location_details: faker.location.city(),
//     });
//   }
//   const branches = await models.branches.bulkCreate(branchesData, {
//     returning: true,
//   });
//   console.log("✅ Branches seeded");
//   return branches;
// };

// const seedDepartments = async () => {
//   const departmentsData = [];
//   const deptNames = [
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Orthopedic",
//     "Pediatrics",
//     "Radiology",
//     "General Medicine",
//     "Dermatology",
//     "ENT",
//     "Ophthalmology",
//   ];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     departmentsData.push({
//       dept_name: faker.helpers.arrayElement(deptNames),
//     });
//   }
//   const departments = await models.departments.bulkCreate(departmentsData, {
//     returning: true,
//   });
//   console.log("✅ Departments seeded");
//   return departments;
// };

// const seedDoctors = async (branches, departments) => {
//   const doctorsData = [];

//   for (let i = 0; i < NUM_RECORDS; i++) {
//     const dept = faker.helpers.arrayElement(departments) || departments[0];
//     const branch = faker.helpers.arrayElement(branches) || branches[0];

//     // Debug logs
//     // console.log(`Doctor #${i + 1}`);
//     // console.log("Selected dept object:", dept);
//     // console.log("dept_name retrieved:", dept?.dept_name);
//     // console.log("Final specialization value:", dept?.dept_name || "General Medicine");
//     // console.log("--------");

//     doctorsData.push({
//       doctor_name: faker.person.fullName(),
//       specialization: dept?.dept_name || "General Medicine",
//       gender: faker.helpers.arrayElement(["Male", "Female"]),
//       dob: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
//       mobile: faker.string.numeric(11),
//       email: faker.internet.email(),
//       pass: faker.internet.password(),
//       branchID: branch?.branch_id || 1,
//       deptID: dept?.dept_id || 1,
//       qualifications: faker.helpers.arrayElement([
//         "MBBS",
//         "MBBS, FCPS",
//         "MBBS, MD",
//         "MBBS, MS",
//         "MBBS, FCPS (Cardiology)",
//         "MBBS, MD (Neurology)"
//       ]),
//       joining_date: faker.date.past({ years: 10 }),
//       fee: faker.number.int({ min: 500, max: 5000 }),
//     });
//   }

//   const doctors = await models.doctors.bulkCreate(doctorsData, {
//     returning: true,
//   });

//   console.log("✅ Doctors seeded");
//   return doctors;
// };

// const seedPatients = async () => {
//   const patientsData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     patientsData.push({
//       patient_name: faker.person.fullName(),
//       gender: faker.helpers.arrayElement(["Male", "Female"]),
//       age: faker.number.int({ min: 1, max: 80 }),
//       mobile: faker.string.numeric(11),
//       email: faker.internet.email(),
//       pass: faker.internet.password(),
//       city: faker.location.city(),
//       account_created: faker.date.past(),
//     });
//   }
//   const patients = await models.patients.bulkCreate(patientsData, {
//     returning: true,
//   });
//   console.log("✅ Patients seeded");
//   return patients;
// };

// const seedAdministration = async (branches) => {
//   const adminsData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     adminsData.push({
//       manager_name: faker.person.fullName(),
//       gender: faker.helpers.arrayElement(["Male", "Female"]),
//       dob: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
//       mobile: faker.string.numeric(11),
//       email: faker.internet.email(),
//       pass: faker.internet.password(),
//       branchID: faker.helpers.arrayElement(branches).branch_id,
//       joining_date: faker.date.past(),
//     });
//   }
//   await models.administration.bulkCreate(adminsData);
//   console.log("✅ Administration seeded");
// };

// const seedEmployees = async (branches) => {
//   const employeesData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     employeesData.push({
//       employee_name: faker.person.fullName(),
//       gender: faker.helpers.arrayElement(["Male", "Female"]),
//       dob: faker.date.birthdate({ min: 20, max: 50, mode: "age" }),
//       role: faker.helpers.arrayElement(["Nurse", "Technician", "Staff"]),
//       mobile: faker.string.numeric(11),
//       email: faker.internet.email(),
//       joining_date: faker.date.past(),
//       branchID: faker.helpers.arrayElement(branches).branch_id,
//     });
//   }
//   await models.employees.bulkCreate(employeesData);
//   console.log("✅ Employees seeded");
// };

// const seedLaboratories = async (departments) => {
//   const labsData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     labsData.push({
//       deptID: faker.helpers.arrayElement(departments).dept_id,
//     });
//   }
//   await models.laboratories.bulkCreate(labsData);
//   console.log("✅ Laboratories seeded");
// };

// const seedTests = async () => {
//   const testsData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     testsData.push({
//       test_name: faker.lorem.words(2),
//       test_price: faker.number.int({ min: 100, max: 5000 }),
//     });
//   }
//   const tests = await models.tests.bulkCreate(testsData, { returning: true });
//   console.log("✅ Tests seeded");
//   return tests;
// };

// const seedDiagnosisHistory = async (patients, tests) => {
//   const diagData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     diagData.push({
//       patientID: faker.helpers.arrayElement(patients).patient_id,
//       testID: faker.helpers.arrayElement(tests).test_id,
//       diagnosis_datetime: faker.date.recent(),
//     });
//   }
//   const diagHistory = await models.diagnoseshistory.bulkCreate(diagData, {
//     returning: true,
//   });
//   console.log("✅ Diagnoses History seeded");
//   return diagHistory;
// };

// const seedSchedules = async () => {
//   const scheduleData = [];
//   const daysArr = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     scheduleData.push({
//       id: i + 1,
//       days: faker.helpers.arrayElement(daysArr),
//       sc_time: faker.date.recent().toTimeString().split(" ")[0],
//       slots: faker.number.int({ min: 0, max: 10 }),
//     });
//   }
//   await models.schedules.bulkCreate(scheduleData);
//   console.log("✅ Schedules seeded");
// };

// const seedAppointments = async (patients, doctors) => {
//   const appointmentsData = [];
//   for (let i = 0; i < NUM_RECORDS; i++) {
//     appointmentsData.push({
//       patientID: faker.helpers.arrayElement(patients).patient_id,
//       doctorID: faker.helpers.arrayElement(doctors).doctor_id,
//       appointment_date: faker.date.soon(),
//       appointment_time: faker.date.recent().toTimeString().split(" ")[0],
//       serial_no: i + 1,
//       status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]),
//     });
//   }
//   await models.appointments.bulkCreate(appointmentsData);
//   console.log("✅ Appointments seeded");
// };

// const seedAll = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected");

//     await sequelize.sync({ force: true });
//     console.log('✅ All tables dropped and recreated');

//     const branches = await seedBranches();
//     const departments = await seedDepartments();
//     const doctors = await seedDoctors(branches, departments);
//     const patients = await seedPatients();
//     await seedAdministration(branches);
//     await seedEmployees(branches);
//     await seedLaboratories(departments);
//     const tests = await seedTests();
//     const diagHistory = await seedDiagnosisHistory(patients, tests);
//     //await seedReports(diagHistory);
//     await seedSchedules();
//     await seedAppointments(patients, doctors);

//     console.log("🎉 All tables seeded successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//     process.exit(1);
//   }
// };

// seedAll();

// server/src/seedAllTables.js
import { faker } from "@faker-js/faker";
import { models, sequelize } from "../config/database.js";
import schedules from "../models/schedules.js";

const NUM_RECORDS = 10;

// -------------------- BRANCHES --------------------
const seedBranches = async () => {
  const locNames = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rajshahi",
  ];

  const branchesData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    branchesData.push({
      location_details: faker.helpers.arrayElement(locNames),
    });
  }
  const branches = await models.branches.bulkCreate(branchesData, { returning: true });
  console.log("✅ Branches seeded");
  return branches;
};

// -------------------- DEPARTMENTS --------------------
const seedDepartments = async () => {
  const deptNames = [
    "Cardiology",
    "Neurology",
    "Oncology",
    "Orthopedic",
    "Pediatrics",
    "Radiology",
    "General Medicine",
    "Dermatology",
    "ENT",
    "Ophthalmology",
  ];

  const departmentsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    departmentsData.push({
      dept_name: faker.helpers.arrayElement(deptNames),
    });
  }
  const departments = await models.departments.bulkCreate(departmentsData, { returning: true });
  console.log("✅ Departments seeded");
  return departments;
};

// -------------------- DOCTORS --------------------
const seedDoctors = async (branches, departments) => {
  const doctorsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    const dept = faker.helpers.arrayElement(departments);
    const branch = faker.helpers.arrayElement(branches);

    doctorsData.push({
      doctor_name: faker.person.fullName(),
      specialization: dept?.dept_name || "General Medicine",
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      dob: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
      mobile: faker.string.numeric(11),
      email: faker.internet.email(),
      pass: faker.internet.password(),
      branchID: branch?.branch_id,
      deptID: dept?.dept_id,
      qualifications: faker.helpers.arrayElement([
        "MBBS",
        "MBBS, FCPS",
        "MBBS, MD",
        "MBBS, MS",
        "MBBS, FCPS (Cardiology)",
        "MBBS, MD (Neurology)"
      ]),
      joining_date: faker.date.past({ years: 10 }),
      fee: faker.number.int({ min: 500, max: 5000 }),
    });
  }
  const doctors = await models.doctors.bulkCreate(doctorsData, { returning: true });
  console.log("✅ Doctors seeded");
  return doctors;
};

// -------------------- PATIENTS --------------------
const seedPatients = async () => {
  const patientsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    patientsData.push({
      patient_name: faker.person.fullName(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      age: faker.number.int({ min: 1, max: 80 }),
      mobile: faker.string.numeric(11),
      email: faker.internet.email(),
      pass: faker.internet.password(),
      city: faker.location.city(),
      account_created: faker.date.past(),
    });
  }
  const patients = await models.patients.bulkCreate(patientsData, { returning: true });
  console.log("✅ Patients seeded");
  return patients;
};

// -------------------- ADMINISTRATION --------------------
const seedAdministration = async (branches) => {
  const adminsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    const branch = faker.helpers.arrayElement(branches);
    adminsData.push({
      manager_name: faker.person.fullName(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      dob: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
      mobile: faker.string.numeric(11),
      email: faker.internet.email(),
      pass: faker.internet.password(),
      branchID: branch.branch_id,
      joining_date: faker.date.past(),
    });
  }
  await models.administration.bulkCreate(adminsData);
  console.log("✅ Administration seeded");
};

// -------------------- EMPLOYEES --------------------
const seedEmployees = async (branches) => {
  const employeesData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    const branch = faker.helpers.arrayElement(branches);
    employeesData.push({
      employee_name: faker.person.fullName(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      dob: faker.date.birthdate({ min: 20, max: 50, mode: "age" }),
      role: faker.helpers.arrayElement(["Nurse", "Technician", "Staff"]),
      mobile: faker.string.numeric(11),
      email: faker.internet.email(),
      joining_date: faker.date.past(),
      branchID: branch.branch_id,
    });
  }
  await models.employees.bulkCreate(employeesData);
  console.log("✅ Employees seeded");
};

// -------------------- LABORATORIES --------------------
const seedLaboratories = async (departments) => {
  const labsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    const dept = faker.helpers.arrayElement(departments);
    labsData.push({
      deptID: dept.dept_id,
    });
  }
  const labs = await models.laboratories.bulkCreate(labsData, { returning: true });
  console.log("✅ Laboratories seeded");
  return labs;
};

// -------------------- TESTS --------------------
const seedTests = async (labs) => {
  const testsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    const lab = faker.helpers.arrayElement(labs);
    testsData.push({
      test_name: faker.lorem.words(2),
      test_price: faker.number.int({ min: 100, max: 5000 }),
      labID: lab.lab_id, // ✅ assign real lab ID
    });
  }
  const tests = await models.tests.bulkCreate(testsData, { returning: true });
  console.log("✅ Tests seeded");
  return tests;
};

// -------------------- DIAGNOSIS HISTORY --------------------
const seedDiagnosisHistory = async (patients, tests) => {
  const diagData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    diagData.push({
      patientID: faker.helpers.arrayElement(patients).patient_id,
      testID: faker.helpers.arrayElement(tests).test_id,
      diagnosis_datetime: faker.date.recent(),
    });
  }
  const diagHistory = await models.diagnoseshistory.bulkCreate(diagData, { returning: true });
  console.log("✅ Diagnoses History seeded");
  return diagHistory;
};

// -------------------- SCHEDULES --------------------
const seedSchedules = async () => {
  const scheduleData = [];
  const daysArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  for (let i = 0; i < 7; i++) {
    scheduleData.push({
      id: i + 1, // explicitly assign unique ID
      days: daysArr[i], // assign each day of the week
    });
  }
  const schedule = await models.schedules.bulkCreate(scheduleData, { returning: true });
  console.log("✅ Schedules seeded");
  return schedule;
};

// -------------------- doc_sc --------------------
const seedDocSc = async (schedule) => {
  const timeSlots = [
    "09:00:00",
    "10:00:00",
    "11:00:00",
  ];
  const docScData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    docScData.push({
      doc_id: i + 1, // assuming doctor IDs start from 1 and are sequential
      sc_id: faker.helpers.arrayElement(schedule).id,
      time: faker.helpers.arrayElement(timeSlots),
      slots: faker.number.int({ min: 10, max: 30 }),
    });
  }
  await models.doc_sc.bulkCreate(docScData);
  console.log("✅ Doctor-Schedule seeded");
};

// -------------------- APPOINTMENTS --------------------
const seedAppointments = async (patients, doctors) => {
  const appointmentsData = [];
  for (let i = 0; i < NUM_RECORDS; i++) {
    appointmentsData.push({
      patientID: faker.helpers.arrayElement(patients).patient_id,
      doctorID: faker.helpers.arrayElement(doctors).doctor_id,
      appointment_date: faker.date.soon(),
      appointment_time: faker.date.recent().toTimeString().split(" ")[0],
      serial_no: i + 1,
      status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]),
    });
  }
  await models.appointments.bulkCreate(appointmentsData);
  console.log("✅ Appointments seeded");
};

// -------------------- MAIN --------------------
const seedAll = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: true });
    console.log("✅ All tables dropped and recreated");

    const branches = await seedBranches();
    const departments = await seedDepartments();
    const doctors = await seedDoctors(branches, departments);
    const patients = await seedPatients();
    await seedAdministration(branches);
    await seedEmployees(branches);

    const labs = await seedLaboratories(departments);
    const tests = await seedTests(labs); // assign correct lab IDs
    await seedDiagnosisHistory(patients, tests);

    const schedules = await seedSchedules();
    await seedDocSc(schedules); // seed doctor-schedule associations
    await seedAppointments(patients, doctors);

    console.log("🎉 All tables seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedAll();