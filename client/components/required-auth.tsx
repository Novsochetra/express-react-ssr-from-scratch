import { Navigate, useLocation } from "react-router";
import { useAuth } from "./auth-provider"; // Your custom hook

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Reads from context or cookie

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
