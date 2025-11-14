const { DataTypes } = require("sequelize");
const sequelize = require("../../db"); 
const  User  = require("./user"); 

const Lead = sequelize.define("Lead", {
  lead_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("New", "Contacted", "Qualified", "Converted", "Lost"),
    defaultValue: "New",
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
  assigned_by: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
{
  tableName: "leads",
  timestamps: false, 
});

Lead.belongsTo(User, { foreignKey: "assigned_to", as: "AssignedTo" });
Lead.belongsTo(User, { foreignKey: "assigned_by", as: "AssignedBy" });
Lead.belongsTo(User, { foreignKey: "created_by", as: "CreatedBy" });

module.exports = { Lead };
