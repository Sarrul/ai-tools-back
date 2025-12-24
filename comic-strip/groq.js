// const { GoogleGenAI } = require("@google/genai");

// // API key is automatically read from process.env.GEMINI_API_KEY
// const ai = new GoogleGenAI({});

// const generateText = async ({ prompt, model = "gemini-2.5-flash" }) => {
//   const response = await ai.models.generateContent({
//     model,
//     contents: ` : ${prompt}`,
//   });
//   console.log("response", response.text);

//   return response.text;
// };

// module.exports = { generateText };
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateText = async ({ prompt, model = "llama-3.3-70b-versatile" }) => {
  const completion = await groq.chat.completions.create({
    model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 512,
  });

  return completion.choices[0].message.content;
};

module.exports = { generateText };
