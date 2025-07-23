export default {
  images: {
    supportedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".avif"],
    fallbackExtension: ".jpg", // optional, for converting unsupported types
    cacheFolder: "dist/cache/image",
    remoteAllowedDomains: ["https://cdn.pixabay.com/"],
  },

  server: {
    port: 3001,
  },
};
