const Visitor = require("../models/visitor.model");
const axios = require("axios");
const UAParser = require("ua-parser-js");

// Save visitor info
exports.trackVisitor = async (req, res) => {
  try {
    const { page } = req.body;

    // Get real visitor IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      "";

    console.log("Visitor IP:", ip);

    const userAgent = req.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();

    // Fetch location from ipapi
    let location = {};
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      location = response.data;
      console.log("Location:", location);
    } catch (err) {
      console.log("Location fetch failed");
      location = {};
    }

    const visitor = await Visitor.create({
      ip,
      country: location.country_name || "",
      city: location.city || "",
      region: location.region || "",
      browser: deviceInfo.browser.name,
      device: deviceInfo.device.type || "Desktop",
      page,
    });

    return res.status(200).json({
      success: true,
      message: "Visitor logged",
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fetch all visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Stats for dashboard
exports.stats = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const uniqueVisitors = await Visitor.distinct("ip");
    return res.status(200).json({
      success: true,
      totalVisitors,
      uniqueVisitors: uniqueVisitors.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
