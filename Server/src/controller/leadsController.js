const { Lead } = require("../module/leads");
const currentTimestamp = new Date();

// ✅ Create new lead
async function createLead(req, res) {
  try {
    const { name, email, phone, company, source, status, assigned_to, assigned_by } = req.body;

    console.log("Before creting created by",req.user)
    const createdBy = req.user ? req.user.user_id : null; 

    const newLead = await Lead.create({
      name,
      email,
      phone,
      company,
      source: source || "Website", 
      status: status || "New",
      assigned_to: assigned_to || null,
      assigned_by: assigned_by || null,
      created_by: createdBy,
    });

    res.status(201).json({ message: "Lead created successfully", data: newLead });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Error creating lead", error });
  }
}

// ✅ Get all leads
async function getAllLeads(req, res) {
  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Error fetching leads" });
  }
}

// ✅ Get single lead
async function getLeadById(req, res) {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Error fetching lead" });
  }
}

// ✅ Update lead
async function updateLead(req, res) {
  try {
    const { id } = req.params;
    const data = {...req.body,updated_at:currentTimestamp,assigned_by:req.user.user_id}
    const updated = await Lead.update(data ,{
      where: { lead_id: id },
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated successfully" });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ message: "Error updating lead" });
  }
}

// ✅ Delete lead
async function deleteLead(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Lead.destroy({ where: { lead_id: id } });

    if (!deleted) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ message: "Error deleting lead" });
  }
}

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
