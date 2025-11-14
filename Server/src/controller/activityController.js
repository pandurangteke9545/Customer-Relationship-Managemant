const Activity = require("../module/activity");

exports.createActivity = async (req, res) => {
  try {
    const data = { ...req.body };

    console.log("We are going to create the activtiy")
    const activity = await Activity.create(data);

    res.status(201).json({
      success: true,
      message: "Activity created",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity)
      return res.status(404).json({ success: false, message: "Not found" });

    await activity.update(req.body);

    res.json({ success: true, message: "Updated", data: activity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity)
      return res.status(404).json({ success: false, message: "Not found" });

    await activity.destroy();

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
