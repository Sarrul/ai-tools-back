const generatePanels = require("./prompt-builder");
const generateImage = require("./hf-image");

const createComicStrip = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt required" });
    }

    console.log(prompt, "promtttttt");

    // 1️⃣ Gemini → comic panels
    // const panels = await generatePanels(prompt);
    // console.log(panels, "panels")

    // 2️⃣ HF → image per panel
    const images = [];
    for (const panel of panels) {
      const img = await generateImage(panel.description);
      images.push({
        caption: panel.caption,
        image: img,
      });
    }

    res.json({
      success: true,
      result: images,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

module.exports = createComicStrip;
