const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generateImage = async (prompt) => {
  const styledPrompt = `
Comic strip illustration, clean line art, flat colors,
consistent character design, bold outlines,
simple background, cartoon style, 2D illustration

${prompt}
`;

  const output = await replicate.run("stability-ai/sdxl", {
    input: {
      prompt: styledPrompt,
      width: 1024,
      height: 1024,
      num_outputs: 1,
    },
  });

  // Replicate returns image URLs
  return output[0];
};

module.exports = generateImage;
