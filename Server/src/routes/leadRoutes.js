const express = require("express");
const { body } = require("express-validator");


const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controller/leadsController");
const { optionalAuthMiddleware } = require("../middleware/optionalAuthMiddleware");
const { authMiddleware } = require("../middleware/authmiddleware");

const leadRouter = express.Router();

leadRouter.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Lead name is required"),
    body("email").isEmail().withMessage("Valid email required"),
  ],optionalAuthMiddleware,
  createLead
);

// ✅ Fetch all leads
leadRouter.get("/",authMiddleware, getAllLeads);

// ✅ Fetch one lead
leadRouter.get("/:id",authMiddleware, getLeadById);

// ✅ Update lead
leadRouter.put("/:id",authMiddleware, updateLead);

// ✅ Delete lead
leadRouter.delete("/:id",authMiddleware, deleteLead);

module.exports = { leadRouter };
