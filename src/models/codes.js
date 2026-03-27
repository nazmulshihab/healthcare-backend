import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class codes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    field_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'codes',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });
  }
}
