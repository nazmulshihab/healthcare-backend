import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class doctors extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    doctor_name: {
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
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    branchID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'branch_id'
      }
    },
    deptID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'dept_id'
      }
    },
    specialization: {
      type: DataTypes.STRING(150),
      allowNull: false
  },
    qualifications: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctors',
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
          { name: "doctor_id" },
        ]
      },
      {
        name: "fk_branch_id",
        using: "BTREE",
        fields: [
          { name: "branchID" },
        ]
      },
      {
        name: "fk_dept_id2",
        using: "BTREE",
        fields: [
          { name: "deptID" },
        ]
      },
    ]
  });
  }
}
