const client = require("./hugging-inference");

const getImageAnalysis = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    console.log("file info:", {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });

    const base64Image = req.file.buffer.toString("base64");

    const response = await client.chatCompletion({
      model: "zai-org/GLM-4.6V-Flash:novita",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in one sentence." },
            {
              type: "image_url",
              image_url: {
                // ✅ USE BASE64 IMAGE
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    console.log("🤖 AI response:", response.choices[0].message);

    res.json({
      success: true,
      result: response.choices[0].message,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Image analysis failed" });
  }
};
module.exports = getImageAnalysis;
