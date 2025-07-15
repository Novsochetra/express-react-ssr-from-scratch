import "./about.out.css";

import { useState } from "react";
import { Link } from "react-router";

export default function About() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1 className="text-blue-400">
        About (SSR)
        <Link to="/home">home</Link>
      </h1>
      <br />
      <button
        onClick={() => {
          setCounter((prev) => ++prev);
        }}
      >
        +
      </button>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter((prev) => --prev);
        }}
      >
        -
      </button>
    </div>
  );
}
