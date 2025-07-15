import "./about.out.css";

import { Link } from "react-router";

export default function Other() {
  return (
    <div>
      <h1 className="text-blue-500">Other (SSR)</h1>
      <br />

      <Link to="/home">home</Link>
    </div>
  );
}
