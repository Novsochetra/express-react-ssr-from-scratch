import compression from "compression";
import { httpLogger } from "./logger.middleware.js";
import { requestIdMiddleware } from "./request-id.middleware.js";
import { nonceMiddleware } from "./nonce.middleware.js";
import { helmetMiddleware } from "./helmet.middleware.js";

// the base middle wares that use for every request
export const middlewares = [
  // Adds a nonce (random token) to each request for secure CSP header usage
  nonceMiddleware(),

  //
  helmetMiddleware(),

  // Adds a unique ID to every request (helps with tracking logs per request)
  requestIdMiddleware(),

  // Logs HTTP requests (method, path, status, response time, etc.)
  httpLogger(),

  // Compresses HTTP responses to reduce payload size (supports Brotli/gzip)
  compression(),
];
