import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  { name: "home", path: path.join(projectRoot, "dist", "index.html") },
  { name: "Workflow", path: path.join(projectRoot, "dist", "projects", "workflow", "index.html") },
];

function getMetaContent(html, attribute, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapedValue}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  const reversePattern = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${escapedValue}["'][^>]*>`,
    "i",
  );

  return html.match(pattern)?.[1] ?? html.match(reversePattern)?.[1];
}

const declarations = await Promise.all(pages.map(async (page) => {
  const html = await readFile(page.path, "utf8");
  return {
    name: page.name,
    ogImageUrl: getMetaContent(html, "property", "og:image"),
    twitterImageUrl: getMetaContent(html, "name", "twitter:image"),
    declaredWidth: Number(getMetaContent(html, "property", "og:image:width")),
    declaredHeight: Number(getMetaContent(html, "property", "og:image:height")),
    imageAlt: getMetaContent(html, "property", "og:image:alt"),
  };
}));

for (const declaration of declarations) {
  if (!declaration.ogImageUrl) throw new Error(`${declaration.name} does not declare og:image.`);
  if (declaration.twitterImageUrl !== declaration.ogImageUrl) {
    throw new Error(`${declaration.name}: twitter:image must match og:image.`);
  }
  if (!declaration.imageAlt) throw new Error(`${declaration.name} does not declare og:image:alt.`);
  if (!declaration.declaredWidth || !declaration.declaredHeight) {
    throw new Error(`${declaration.name} does not declare valid social image dimensions.`);
  }
}

const [primaryDeclaration] = declarations;
const ogImageUrl = primaryDeclaration.ogImageUrl;
if (declarations.some((declaration) => declaration.ogImageUrl !== ogImageUrl)) {
  throw new Error("Every page must use the same verified social preview asset.");
}

const imageUrl = new URL(ogImageUrl);
const fingerprintMatch = imageUrl.pathname.match(/portfolio-og-([a-f0-9]{8})\.png$/i);
if (!fingerprintMatch) {
  throw new Error("Social preview filename must contain its content fingerprint to prevent stale unfurl caches.");
}

const imagePath = path.join(projectRoot, "dist", decodeURIComponent(imageUrl.pathname).replace(/^\/+/, ""));
const image = await readFile(imagePath);
const pngSignature = "89504e470d0a1a0a";

if (image.subarray(0, 8).toString("hex") !== pngSignature) {
  throw new Error("The social preview asset is not a valid PNG.");
}

const actualWidth = image.readUInt32BE(16);
const actualHeight = image.readUInt32BE(20);
const actualFingerprint = createHash("sha256").update(image).digest("hex").slice(0, 8);

if (actualFingerprint !== fingerprintMatch[1].toLowerCase()) {
  throw new Error(`Social preview filename fingerprint ${fingerprintMatch[1]} does not match ${actualFingerprint}.`);
}

for (const declaration of declarations) {
  if (actualWidth !== declaration.declaredWidth || actualHeight !== declaration.declaredHeight) {
    throw new Error(`${declaration.name}: declared dimensions do not match ${actualWidth}x${actualHeight}.`);
  }
}

if (image.length < 10_000) {
  throw new Error("The social preview asset is unexpectedly small.");
}

console.log(
  `Social preview verified: ${imageUrl.pathname} (${actualWidth}x${actualHeight}, ${image.length} bytes).`,
);
