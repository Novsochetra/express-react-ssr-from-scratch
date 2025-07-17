import { Navigate } from "react-router";
import { useAuth } from "../components/auth-provider";

export const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
