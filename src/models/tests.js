import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class tests extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        test_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        test_name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        labID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: "1009",
          references: {
            model: "laboratories",
            key: "lab_id",
          },
        },
        test_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tests",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "test_id" }],
          },
          {
            name: "fk_test_labID",
            using: "BTREE",
            fields: [{ name: "labID" }],
          },
        ],
      }
    );
  }
}
