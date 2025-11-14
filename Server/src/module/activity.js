
const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const {Lead} = require("./leads");
const User = require("./user");

const Activity = sequelize.define(
  "Activity",
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "leads",
        key: "lead_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    type: {
      type: DataTypes.ENUM("Call", "Email", "Meeting", "Note", "StatusChange"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activity_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "activities",
    timestamps: false,
  }
);

Activity.belongsTo(Lead, {
  foreignKey: "lead_id",
  as: "Lead",
});

Activity.belongsTo(User, {
  foreignKey: "user_id",
  as: "PerformedBy",
});

module.exports = Activity ;