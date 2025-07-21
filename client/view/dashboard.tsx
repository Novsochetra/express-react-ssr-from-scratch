import { Link } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-blue-500">Dashboard</h1>
      <br />

      <Link to="/home">Home</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/front-page">Front page</Link>
    </div>
  );
}
