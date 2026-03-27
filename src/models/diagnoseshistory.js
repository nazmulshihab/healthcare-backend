import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class diagnoseshistory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'patient_id'
      }
    },
    testID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tests',
        key: 'test_id'
      }
    },
    diagnosis_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    diagnosis_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'diagnoseshistory',
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
          { name: "diagnosis_id" },
        ]
      },
      {
        name: "fk_patient_id2",
        using: "BTREE",
        fields: [
          { name: "patientID" },
        ]
      },
      {
        name: "fk_test_id",
        using: "BTREE",
        fields: [
          { name: "testID" },
        ]
      },
    ]
  });
  }
}
