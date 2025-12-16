const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// 1. IMAGE ANALYSIS
app.post("/api/analyze-image", upload.single("image"), (req, res) => {
  console.log("\n=== IMAGE ANALYSIS REQUEST ===");

  if (!req.file) {
    console.log("❌ No image uploaded");
    return res.status(400).json({ error: "No image uploaded" });
  }

  console.log("✅ Image received:");
  console.log("  - Original name:", req.file.originalname);
  console.log("  - Size:", (req.file.size / 1024).toFixed(2), "KB");
  console.log("  - MIME type:", req.file.mimetype);
  console.log("  - Buffer length:", req.file.buffer.length, "bytes");

  // You can save the file here or process it
  // For now, just logging

  res.json({
    success: true,
    message: "Image received successfully",
    imageInfo: {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    },
  });
});

// 2. INGREDIENT RECOGNITION - Text input
app.post("/api/recognize-ingredients", (req, res) => {
  console.log("\n=== INGREDIENT RECOGNITION REQUEST ===");

  const { description } = req.body;

  if (!description) {
    console.log("❌ No description provided");
    return res.status(400).json({ error: "No description provided" });
  }

  console.log("✅ Recipe description received:");
  console.log("  - Description:", description);
  console.log("  - Length:", description.length, "characters");

  res.json({
    success: true,
    message: "Description received successfully",
    data: {
      description: description,
      length: description.length,
    },
  });
});

// 3. IMAGE CREATOR - Text input
app.post("/api/create-image", (req, res) => {
  console.log("\n=== IMAGE CREATOR REQUEST ===");

  const { foodDescription } = req.body;

  if (!foodDescription) {
    console.log("❌ No food description provided");
    return res.status(400).json({ error: "No food description provided" });
  }

  console.log("✅ Food description received:");
  console.log("  - Description:", foodDescription);
  console.log("  - Length:", foodDescription.length, "characters");

  res.json({
    success: true,
    message: "Food description received successfully",
    data: {
      foodDescription: foodDescription,
      length: foodDescription.length,
    },
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 Server is running!");
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log("\n📋 Available endpoints:");
  console.log("  POST /api/analyze-image");
  console.log("  POST /api/recognize-ingredients");
  console.log("  POST /api/create-image");
  console.log("\n👀 Waiting for requests...\n");
});
