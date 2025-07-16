import path from "node:path";
import fs from "node:fs";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import { createStream } from "rotating-file-stream";

const isProd = process.env.NODE_ENV === "production";

const logDir = path.resolve(process.cwd(), "logs/server");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Rotate daily, keep 7 files, compress old logs
const fileStream = createStream("app.log", {
  interval: "1d", // rotate daily
  path: logDir,
  maxFiles: 7,
  compress: "gzip",
});

const streams = [
  { stream: process.stdout }, // terminal
  { stream: fileStream }, // rotating log file
];

const logger = pino(
  {
    level: isProd ? "info" : "debug",
    base: {
      service: "xmenu",
      env: process.env.NODE_ENV || "development",
    },
    timestamp: pino.stdTimeFunctions.isoTime, // ISO8601 timestamps
    formatters: {
      level(label) {
        return { level: label }; // human readable level name
      },
    },
  },
  pino.multistream(streams)
);

export function httpLogger() {
  return pinoHttp({
    logger,
    serializers: {
      request(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          headers: req.headers,
        };
      },
      response(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 500 || err) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  });
}
