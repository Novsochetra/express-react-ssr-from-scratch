import { RoutePathValues } from "../route-path.js";

export function routeValidator(req, res, next) {
  // Check if it's a valid app route
  const path = req.originalUrl.split("?")[0];
  const isKnownRoute = RoutePathValues.includes(req.originalUrl);

  if (!isKnownRoute) {
    return res.status(404).send("Not Found");
  }

  next();
}
