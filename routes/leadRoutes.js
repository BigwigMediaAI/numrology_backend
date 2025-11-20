// routes/leadRoutes.js
const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  deleteLead,
  updateLeadMarked,
} = require("../controllers/leadController");

// POST - Create Lead
router.post("/add", createLead);

// GET - Fetch All Leads
router.get("/", getLeads);

// DELETE - Delete Lead by ID
router.delete("/:id", deleteLead);

// update marked status
router.put("/mark/:id", updateLeadMarked);

module.exports = router;
