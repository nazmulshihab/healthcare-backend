import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class administration extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    manager_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branchID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'branch_id'
      }
    },
    manager_name: {
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
    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'administration',
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
          { name: "manager_id" },
        ]
      },
      {
        name: "fk_branch_id2",
        using: "BTREE",
        fields: [
          { name: "branchID" },
        ]
      },
    ]
  });
  }
}
