const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const generateImage = async (prompt) => {
  const image = await client.textToImage({
    model: "stabilityai/stable-diffusion-xl-base-1.0",
    inputs: prompt,
  });

  const buffer = Buffer.from(await imageBlob.arrayBuffer());
  const base64Image = buffer.toString("base64");

  return base64Image;
};

module.exports = generateImage;
