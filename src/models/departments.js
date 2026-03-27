import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class departments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    dept_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dept_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'departments',
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
          { name: "dept_id" },
        ]
      },
    ]
  });
  }
}
