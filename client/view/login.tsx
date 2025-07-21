import { Link } from "react-router";

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/home">Home</Link>
      <br />
      <Link to="/dashboard">Dashboard</Link>
      <br />
      <Link to="/front-page">Front page</Link>
    </div>
  );
};

export default Login;
