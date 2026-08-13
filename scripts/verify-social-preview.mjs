import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const builtIndexPath = path.join(projectRoot, "dist", "index.html");
const builtIndex = await readFile(builtIndexPath, "utf8");

function getMetaContent(attribute, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapedValue}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  const reversePattern = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${escapedValue}["'][^>]*>`,
    "i",
  );

  return builtIndex.match(pattern)?.[1] ?? builtIndex.match(reversePattern)?.[1];
}

const ogImageUrl = getMetaContent("property", "og:image");
const twitterImageUrl = getMetaContent("name", "twitter:image");
const declaredWidth = Number(getMetaContent("property", "og:image:width"));
const declaredHeight = Number(getMetaContent("property", "og:image:height"));

if (!ogImageUrl) throw new Error("The production HTML does not declare og:image.");
if (twitterImageUrl !== ogImageUrl) {
  throw new Error("twitter:image must use the same verified asset as og:image.");
}

const imageUrl = new URL(ogImageUrl);
const imagePath = path.join(projectRoot, "dist", decodeURIComponent(imageUrl.pathname));
const image = await readFile(imagePath);
const pngSignature = "89504e470d0a1a0a";

if (image.subarray(0, 8).toString("hex") !== pngSignature) {
  throw new Error("The social preview asset is not a valid PNG.");
}

const actualWidth = image.readUInt32BE(16);
const actualHeight = image.readUInt32BE(20);

if (actualWidth !== declaredWidth || actualHeight !== declaredHeight) {
  throw new Error(
    `Declared social image dimensions ${declaredWidth}x${declaredHeight} do not match ${actualWidth}x${actualHeight}.`,
  );
}

if (image.length < 10_000) {
  throw new Error("The social preview asset is unexpectedly small.");
}

console.log(
  `Social preview verified: ${imageUrl.pathname} (${actualWidth}x${actualHeight}, ${image.length} bytes).`,
);
