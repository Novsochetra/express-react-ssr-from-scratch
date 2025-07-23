import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import axios from "axios";

import { getDomainFromURL } from "../lib/utils/url.js";
import { resizeImage, getImageExtensionFromUrl } from "../lib/utils/image.js";
import { loadAppConfig } from "../bootstrap/config.js";
import { getDirname } from "../lib/utils/fs.js";

export const getImage = async (req, res, _next) => {
  const { url, width, height } = req.query;

  if (!url) {
    return res.status(400).send("Missing url param");
  }

  const domain = getDomainFromURL(url);
  if (!domain) {
    return res.status(400).send("URL is incorrect");
  }

  const isAllowedDomain = loadAppConfig().images?.remoteAllowedDomains?.find(
    (u) => {
      const allowedDomain = getDomainFromURL(u);
      return allowedDomain === domain;
    }
  );

  if (!isAllowedDomain) {
    return res.status(400).send("URL domain not allowed");
  }

  const w = parseInt(width) || null;
  const h = parseInt(height) || null;

  // Sanitize filename by hashing url + width + height
  const hash = crypto
    .createHash("md5")
    .update(url + (w || "") + (h || ""))
    .digest("hex");

  const extension = getImageExtensionFromUrl(url);

  if (!extension) {
    return res.status(400).send("Invalid image format");
  }

  if (!loadAppConfig()?.images?.supportedExtensions?.includes(extension)) {
    return res.status(500).send("Unsupport image format");
  }

  const cachedImagePath = path.join(
    getDirname(),
    loadAppConfig().images.cacheFolder,
    hash + extension
  );

  // Serve cached if exists
  if (fs.existsSync(cachedImagePath)) {
    res.type("image/jpeg");
    return res.sendFile(cachedImagePath);
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const resizedBuffer = await resizeImage(response.data, {
      width: w,
      height: h,
    });
    // Save resized image to cache
    fs.writeFileSync(cachedImagePath, resizedBuffer);

    // Send resized image
    res.type("image/jpeg");
    res.send(resizedBuffer);
  } catch (err) {
    console.error("Image processing error:", err);
    res.status(500).send("Error processing image");
  }
};
