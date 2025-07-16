import { v4 as uuidv4 } from "uuid";

/**
 * Express middleware to generate and attach a unique request ID (UUID v4)
 * to each incoming HTTP request.
 *
 * - Attaches `req.id` for use within route handlers or logging.
 * - Sets `res.locals.requestId` for use in SSR templates or response injection.
 * - Adds the ID to the `X-Request-ID` response header for traceability across services.
 *
 * This is useful for:
 * - Log correlation (especially in distributed systems)
 * - Debugging and error tracking
 * - Integrating with observability tools like Grafana Loki or ELK
 *
 * @returns Express middleware function
 */

export function requestIdMiddleware() {
  return (req, res, next) => {
    const requestId = uuidv4();
    req.id = requestId; // 👈 for use in handlers
    res.locals.requestId = requestId; // 👈 useful in SSR, logging, headers, etc.

    // Optional: Add it to response headers
    res.setHeader("X-Request-ID", requestId);

    next();
  };
}
