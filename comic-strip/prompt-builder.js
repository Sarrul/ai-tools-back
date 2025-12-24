const { generateText } = require("./groq");

const generatePanels = async (storyPrompt) => {
  const prompt = `
  You are a comic writer.
  
Create a 4-panel comic strip from this idea:
"${storyPrompt}"

Rules:
- Each panel must be a single moment in time
- Keep characters consistent across panels
- Make it fun and visually descriptive
- Keep descriptions suitable for image generation
- Return ONLY valid JSON
- Do NOT include markdown, explanation, or extra text



Return JSON only in this format:
[
  { "description": "...", "caption": "..." },
  { "description": "...", "caption": "..." },
  { "description": "...", "caption": "..." },
  { "description": "...", "caption": "..." }
]
`;

  const text = await generateText({ prompt });

  const cleanText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanText);
};

module.exports = generatePanels;
