import helmet from "helmet";

export function helmetMiddleware() {
  return function (req, res, next) {
    return helmet({
      crossOriginResourcePolicy: {
        policy: "same-site",
      },
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        },
      },
    })(req, res, next);
  };
}
