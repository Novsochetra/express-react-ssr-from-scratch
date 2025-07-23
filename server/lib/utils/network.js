import os from "node:os";

export function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();

  for (const ifaceName of Object.keys(interfaces)) {
    for (const iface of interfaces[ifaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address; // e.g., '192.168.1.100'
      }
    }
  }
  return null;
}
