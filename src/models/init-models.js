import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _administration from "./administration.js";
import _appointments from "./appointments.js";
import _branches from "./branches.js";
import _codes from "./codes.js";
import _departments from "./departments.js";
import _diagnoseshistory from "./diagnoseshistory.js";
import _doctors from "./doctors.js";
import _employees from "./employees.js";
import _laboratories from "./laboratories.js";
import _patients from "./patients.js";
import _reports from "./reports.js";
import _schedules from "./schedules.js";
import _doc_sc from "./doc_sc.js";
import _tests from "./tests.js";

export default function initModels(sequelize) {
  const administration = _administration.init(sequelize, DataTypes);
  const appointments = _appointments.init(sequelize, DataTypes);
  const branches = _branches.init(sequelize, DataTypes);
  const codes = _codes.init(sequelize, DataTypes);
  const departments = _departments.init(sequelize, DataTypes);
  const diagnoseshistory = _diagnoseshistory.init(sequelize, DataTypes);
  const doctors = _doctors.init(sequelize, DataTypes);
  const employees = _employees.init(sequelize, DataTypes);
  const laboratories = _laboratories.init(sequelize, DataTypes);
  const patients = _patients.init(sequelize, DataTypes);
  const reports = _reports.init(sequelize, DataTypes);
  const schedules = _schedules.init(sequelize, DataTypes);
  const doc_sc = _doc_sc.init(sequelize, DataTypes);
  const tests = _tests.init(sequelize, DataTypes);

  administration.belongsTo(branches, { as: "branch", foreignKey: "branchID" });
  branches.hasMany(administration, {
    as: "administrations",
    foreignKey: "branchID",
  });
  doctors.belongsTo(branches, { as: "branch", foreignKey: "branchID" });
  branches.hasMany(doctors, { as: "doctors", foreignKey: "branchID" });
  doctors.belongsTo(departments, { as: "dept", foreignKey: "deptID" });
  departments.hasMany(doctors, { as: "doctors", foreignKey: "deptID" });
  laboratories.belongsTo(departments, { as: "dept", foreignKey: "deptID" });
  departments.hasMany(laboratories, {
    as: "laboratories",
    foreignKey: "deptID",
  });
  doctors.belongsToMany(schedules, {
    through: doc_sc,
    foreignKey: "doc_id",
    otherKey: "sc_id",
    as: "schedules", // 👈 MUST MATCH CONTROLLER
  });

  schedules.belongsToMany(doctors, {
    through: doc_sc,
    foreignKey: "sc_id",
    otherKey: "doc_id",
    as: "doctors",
  });
  reports.belongsTo(diagnoseshistory, {
    as: "report",
    foreignKey: "report_id",
  });
  diagnoseshistory.hasMany(reports, { as: "reports", foreignKey: "report_id" });
  appointments.belongsTo(doctors, { as: "doctor", foreignKey: "doctorID" });
  doctors.hasMany(appointments, { as: "appointments", foreignKey: "doctorID" });
  appointments.belongsTo(patients, { as: "patient", foreignKey: "patientID" });
  patients.hasMany(appointments, {
    as: "appointments",
    foreignKey: "patientID",
  });
  diagnoseshistory.belongsTo(patients, {
    as: "patient",
    foreignKey: "patientID",
  });
  patients.hasMany(diagnoseshistory, {
    as: "diagnoseshistories",
    foreignKey: "patientID",
  });
  diagnoseshistory.belongsTo(tests, { as: "test", foreignKey: "testID" });
  tests.hasMany(diagnoseshistory, {
    as: "diagnoseshistories",
    foreignKey: "testID",
  });

  return {
    administration,
    appointments,
    branches,
    codes,
    departments,
    diagnoseshistory,
    doctors,
    employees,
    laboratories,
    patients,
    reports,
    schedules,
    doc_sc,
    tests,
  };
}
