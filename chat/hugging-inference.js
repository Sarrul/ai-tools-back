const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const sendMessage = async (messages) => {
  // messages: [{role: "user"|"assistant", text: "..."}]
  const conversation = messages.map((m) => ({
    role: m.role,
    content: [{ type: "text", text: m.text }],
  }));

  const response = await client.chat.conversations.create({
    model: "gpt-3.5-chat",
    messages: conversation,
  });

  return response.choices[0].message.text;
};

module.exports = sendMessage;
