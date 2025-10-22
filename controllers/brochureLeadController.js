const BrochureLead = require("../models/brochureLead.model");

// Create a new lead
// controllers/leadController.js
exports.createLead = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Check if a lead with the same phone exists
    const existingLead = await BrochureLead.findOne({ phone });

    if (existingLead) {
      // Already exists, return existing lead without creating duplicate
      return res.status(200).json({
        message: "Lead already exists",
        lead: existingLead,
      });
    }

    // If not exist, create a new lead
    const lead = new BrochureLead({ name, phone });
    await lead.save();

    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await BrochureLead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await BrochureLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a lead (marking)
exports.updateLead = async (req, res) => {
  try {
    const lead = await BrochureLead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await BrochureLead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
