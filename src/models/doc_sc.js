import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;


export default class doc_sc extends Model {
    static init(sequelize, DataTypes) {
  return super.init({
    sc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'schedules',
            key: 'id'
        }
    },
    doc_id: {
        type: DataTypes.INTEGER,    
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'doctors',
            key: 'doctor_id'
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '05:00:00'// default time if not provided
    },
    slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:'20' // default slots if not provided
    }
}, {
    sequelize,
    tableName: 'doc_sc',
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
          { name: "sc_id" },
          { name: "doc_id" }
        ]
      },
      {
        name: "fk_doc_sc",
        using: "BTREE ",
        fields: [
          { name: "doc_id" },
        ]
      },
         {
        name: "fk_doc_sc_2",
        using: "BTREE ",
        fields: [
            { name: "sc_id" },
        ]
      }
    ]
  }); 
}
}