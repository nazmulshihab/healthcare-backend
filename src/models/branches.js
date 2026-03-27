import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class branches extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    branch_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    // location_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    location_details: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'branches',
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
          { name: "branch_id" },
        ]
      },
    ]
  });
  }
}
