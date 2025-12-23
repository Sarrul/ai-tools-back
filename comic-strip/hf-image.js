const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const generateImage = async (prompt) => {
  const styledPrompt = `
Comic strip illustration, clean line art, flat colors,
consistent character design, bold outlines,
simple background, cartoon style, 2D illustration

${prompt}
`;

  const image = await client.textToImage({
    model: "stabilityai/stable-diffusion-xl-base-1.0",
    inputs: styledPrompt,
  });

  const buffer = Buffer.from(await image.arrayBuffer());
  const base64Image = buffer.toString("base64");

  return `data:image/png;base64,${base64Image}`;
};

module.exports = generateImage;
