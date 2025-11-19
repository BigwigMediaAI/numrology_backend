const express = require("express");
const router = express.Router();
const {
  trackVisitor,
  getVisitors,
  stats,
} = require("../controllers/visitorController");

// POST: track a visitor (frontend calls this)
router.post("/track", trackVisitor);

// GET: fetch all visitor records
router.get("/", getVisitors);

// GET: stats for admin panel
router.get("/stats", stats);

module.exports = router;
