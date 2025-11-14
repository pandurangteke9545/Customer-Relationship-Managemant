const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity
} = require("../controller/activityController");

const activityrouter = express.Router();

activityrouter.post("/create", createActivity);
activityrouter.get("/", getAllActivities);
activityrouter.get("/:id", getActivityById);
activityrouter.put("/:id", updateActivity);
activityrouter.delete("/:id", deleteActivity);

module.exports = activityrouter;
