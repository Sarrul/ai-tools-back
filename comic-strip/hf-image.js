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

  const output = await replicate.run(
    "prompthero/openjourney-v4:e8818682e72a8b25895c7d90e889b712b6edfc5151f145e3606f21c1e85c65bf",
    {
      input: {
        prompt: styledPrompt,
        width: 1024,
        height: 1024,
        num_outputs: 1,
      },
    }
  );

  // Replicate returns image URLs
  return output[0];
};

module.exports = generateImage;
