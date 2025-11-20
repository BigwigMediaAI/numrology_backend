// controllers/leadController.js
const Lead = require("../models/leads.model");
const sendEmail = require("../utils/sendEmail"); // <-- import email sender
require("dotenv").config();

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);

    // ============================
    //  SEND EMAIL TO OWNER
    // ============================
    const ownerEmail = process.env.OWNER_EMAIL;

    const emailHTML = `
  <div style="font-family: Arial, sans-serif; padding: 10px;">
    <img src="https://res.cloudinary.com/dcq2oziz4/image/upload/v1763364236/DBN_LOGO_final_1_bgomc9.png" 
         alt="Company Logo" 
         style="width: 150px; margin-bottom: 20px;" />

    <h2>📩 New Lead Received</h2>
    <p><strong>Name:</strong> ${newLead.name}</p>
    <p><strong>Email:</strong> ${newLead.email}</p>
    <p><strong>Phone:</strong> ${newLead.phone}</p>
    <p><strong>Message:</strong> ${newLead.message}</p>
    <p>Received At: ${newLead.createdAt}</p>
  </div>
`;

    await sendEmail({
      to: ownerEmail,
      subject: "New Lead Received",
      html: emailHTML,
    });

    // ============================
    //  API RESPONSE
    // ============================
    return res.status(201).json({
      success: true,
      message: "Lead created & email sent to owner",
      data: newLead,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: leads });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Lead by ID
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Lead Marked Status
exports.updateLeadMarked = async (req, res) => {
  try {
    const { id } = req.params;
    const { marked } = req.body; // Expect: { marked: true/false }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { marked },
      { new: true }
    );

    if (!updatedLead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Lead marked status updated",
      data: updatedLead,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
