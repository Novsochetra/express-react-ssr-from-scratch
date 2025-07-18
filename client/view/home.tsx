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

      <a href="/dashboard">Dashboard</a>
      <br />
      <a href="/login">login</a>
      <br />
      <a href="/front-page">Front page</a>

      <br />

      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
      <p>{counter}</p>
      <button onClick={() => setCounter((prev) => prev - 1)}>-</button>
    </div>
  );
}
