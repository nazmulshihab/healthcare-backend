import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class appointments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    appointment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'patient_id'
      }
    },
    doctorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'doctor_id'
      }
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: "17:00:00"
    },
    serial_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'appointments',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "appointment_id" },
        ]
      },
      {
        name: "fk_patient_id",
        using: "BTREE",
        fields: [
          { name: "patientID" },
        ]
      },
      {
        name: "fk_doctor_id",
        using: "BTREE",
        fields: [
          { name: "doctorID" },
        ]
      },
    ]
  });
  }
}
