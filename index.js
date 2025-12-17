const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const getImageAnalysis = require("./image-analysis");

const app = express();
const PORT = 5000;

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(cors());
app.use(express.json());

app.post("/api/analyze-image", upload.single("image"), getImageAnalysis);

app.listen(PORT, () => {
  console.log("Server is running!");
  console.log(`Listening on http://localhost:${PORT}`);
});
