export function getDomainFromURL(url) {
  try {
    const newURL = new URL(url);
    return newURL.hostname;
  } catch (error) {
    return null;
  }
}
