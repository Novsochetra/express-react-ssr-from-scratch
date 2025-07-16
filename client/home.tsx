import "./home.out.css";

import { Suspense, lazy } from "react";
import { Link } from "react-router";
import HomeSideBar from "./home-sidebar";
import { RoutePath } from "../server/route-path";

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
      <Link to="/about" className="bg-blue-500 font-bold">
        About
      </Link>
      <br />
      <Link to={RoutePath.FRONT_PAGE} className="bg-blue-500 font-bold">
        Front Page
      </Link>
      <br />

      <Link to={RoutePath.HOME_DETAIL} className="bg-blue-500 font-bold">
        Home Detail
      </Link>

      <HomeSideBar />

      <Suspense fallback={<p>loading content....</p>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
