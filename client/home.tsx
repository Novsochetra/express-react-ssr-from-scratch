import { Suspense, lazy } from "react";
import { Link } from "react-router";
import HomeSideBar from "./home-sidebar";
const HomeContent = lazy(() => import("./home-content"));

export default function Home() {
  return (
    <div>
      <h1
        onClick={() => {
          console.log("HI");
        }}
      >
        Home (SSR) other
      </h1>

      <br />
      <Link to="/about">About</Link>

      <HomeSideBar />

      <Suspense fallback={<p>loading content....</p>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
