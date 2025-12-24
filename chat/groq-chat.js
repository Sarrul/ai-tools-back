// const { InferenceClient } = require("@huggingface/inference");

// const client = new InferenceClient(process.env.HF_TOKEN);

// const MAX_HISTORY = 6;

// const sendMessage = async (messages) => {
//   const conversation = messages.slice(-MAX_HISTORY).map((m) => ({
//     role: m.role,
//     content: m.text,
//   }));

//   const response = await client.chatCompletion({
//     model: "meta-llama/Llama-3.1-8B-Instruct:novita",
//     messages: conversation,
//     max_tokens: 512,
//   });

//   return response.choices[0].message.content;
// };

// module.exports = sendMessage;
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MAX_HISTORY = 6;

const sendMessage = async (messages) => {
  const conversation = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: m.text,
  }));

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: conversation,
    temperature: 0.7,
    max_tokens: 512,
  });

  return completion.choices[0].message.content;
};

module.exports = sendMessage;
