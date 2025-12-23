const express = require("express");
const cors = require("cors");
const multer = require("multer");
const env = require("dotenv");

env.config();

const app = express();
const PORT = 5000;

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(cors());
app.use(express.json());

// image analysis
const getImageAnalysis = require("./image-analysis");
app.post("/api/analyze-image", upload.single("image"), getImageAnalysis);

// comic strip
const createComicStrip = require("./comic-strip");
app.post("/api/create-image", createComicStrip);

// chat
const chatRouter = require("./chat");
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log("Server is running!");
  console.log(`Listening on http://localhost:${PORT}`);
});
