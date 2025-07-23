import sharp from "sharp";
import { Buffer } from "node:buffer";

export function getImageExtensionFromUrl(imageUrl) {
  try {
    const pathname = new URL(imageUrl).pathname;
    const match = pathname.match(/(\.[a-zA-Z0-9]+)(?:\?.*)?$/);
    return match ? match[1].toLowerCase() : null;
  } catch {
    return null;
  }
}

export async function resizeImage(inputImageBuffer, { width, height }) {
  const imageBuffer = Buffer.from(inputImageBuffer);

  // Resize with sharp
  let transformer = sharp(imageBuffer);
  if (width || height) {
    transformer = transformer.resize(width, height, {
      fit: "cover",
      withoutEnlargement: true, // don't upscale small images
    });
  }

  // TODO (improvment): we can optimize the reponse type base on user request browser
  // webp, avif, or if not just reponse the default format
  // for now we just resize to jpeg by default
  const resizedBuffer = await transformer.jpeg().toBuffer();

  return resizedBuffer;
}
