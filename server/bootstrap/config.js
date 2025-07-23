import appConfig from "../../app.config.js";

let cachedConfig = null;

export function loadAppConfig() {
  if (cachedConfig) return cachedConfig; // Cache to avoid repeated file reads

  try {
    cachedConfig = appConfig;
  } catch (err) {
    console.error("Failed to load app.config.js", err);
    cachedConfig = {};
  }

  return cachedConfig;
}
