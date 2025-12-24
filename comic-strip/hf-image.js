const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const generateImage = async () =>
  // prompt
  {
    const styledPrompt = `
Comic strip illustration, clean line art, flat colors,
consistent character design, bold outlines,
simple background, cartoon style, 2D illustration
response [
  {
    "description": "A bright, sunny day on a bustling city sidewalk. Pat, a cheerful-looking person in their early 30s wearing a green hoodie and jeans, walks with their head down, engrossed in their smartphone. A 'Walk' signal is visible across the street. Their backpack is slung over one shoulder.",
    "caption": "Just another walk..."
  },
  {
    "description": "Pat has walked straight into a bright orange traffic cone subtly placed on the sidewalk. The cone is now perched comically on Pat's head, slightly askew. Pat looks startled, eyes wide, with their phone still clutched in hand. A single leaf from a nearby tree is stuck to the cone.",
    "caption": "...or so Pat thought."
  },
  {
    "description": "Pat is trying to nonchalantly remove the traffic cone from their head, attempting to look like it was an intentional fashion choice. Their expression is a mix of forced casualness and deep embarrassment. A mischievous-looking squirrel on a park bench nearby is observing Pat with a knowing smirk.",
    "caption": "Nailed it. Total control."
  },
  {
    "description": "Pat is now confidently striding down the street, still wearing the bright orange traffic cone as if it were a stylish new hat. They have a wide, confident grin, and one hand is casually placed on the cone. Other pedestrians in the background are doing obvious double-takes and whispering, amused.",
    "caption": "New fashion trend, anyone?"
  }
]

`;
    // ${prompt}

    const image = await client.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: styledPrompt,
    });

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    return `data:image/png;base64,${base64Image}`;
  };

module.exports = generateImage;
