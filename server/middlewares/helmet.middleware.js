import helmet from "helmet";

export function helmetMiddleware() {
  return function (req, res, next) {
    return helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: ["'self'", (_req, res) => `'nonce-${res.locals.nonce}'`],
        },
      },
    })(req, res, next);
  };
}
