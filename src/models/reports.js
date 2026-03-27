import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class reports extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'diagnoseshistory',
        key: 'diagnosis_id'
      }
    },
    file_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "Not Found"
    }
  }, {
    sequelize,
    tableName: 'reports',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    indexes: [
      {
        name: "fk_diagnosis_id",
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
    ]
  });
  }
}
