import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class schedules extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    days: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'schedules',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });
  }
}
