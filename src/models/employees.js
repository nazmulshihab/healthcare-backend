import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employees extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    eid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branchID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employee_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Male','Female'),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "Nurse"
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employees',
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
          { name: "eid" },
        ]
      },
    ]
  });
  }
}
