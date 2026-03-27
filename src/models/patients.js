import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class patients extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patient_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gender: {
      type: DataTypes.ENUM('Male','Female'),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Not Specified"
    },
    account_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    patient_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'patients',
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
          { name: "patient_id" },
        ]
      },
    ]
  });
  }
}
