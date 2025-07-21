import { Link } from "react-router";
import "./home.out.css";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1
        onClick={() => {
          console.log("HI");
        }}
      >
        Home (SSR)
      </h1>

      <Link to="/dashboard" prefetch="render">
        Dashboard
      </Link>
      <br />
      <Link to="/login">login</Link>
      <br />
      <Link to="/front-page">Front page</Link>

      <br />

      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
      <p>{counter}</p>
      <button onClick={() => setCounter((prev) => prev - 1)}>-</button>
    </div>
  );
}
