const express = require("express");
const cors = require("cors");
const { connect } = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/leads", leadRoutes);

app.use("/", (req, res) => {
  res.send("API LIVE🚀");
});

// Start server
app.listen(process.env.PORT, async () => {
  try {
    await connect();
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }

  console.log(`🚀 Server is listening on port ${process.env.PORT}`);
});
