const { GoogleGenAI } = require("@google/genai");

// API key is automatically read from process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

const generateText = async ({ prompt, model = "gemini-2.5-flash" }) => {
  const response = await ai.models.generateContent({
    model,
    contents: ` : ${prompt}`,
  });
  console.log("response", response.text);

  return response.text;
};

module.exports = { generateText };
