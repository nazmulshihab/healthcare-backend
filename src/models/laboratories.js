import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class laboratories extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    lab_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deptID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'dept_id'
      }
    }
  }, {
    sequelize,
    tableName: 'laboratories',
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
          { name: "lab_id" },
        ]
      },
      {
        name: "fk_dept_id",
        using: "BTREE",
        fields: [
          { name: "deptID" },
        ]
      },
    ]
  });
  }
}
