import "./base.out.css";
import { DefaultHomePage } from "./default-home";

export const FrontPage = () => {
  if (typeof window === "undefined") {
    return <div></div>;
  }

  return <DefaultHomePage />;
};

export const PriceCard = ({ title, desc, href }) => {
  return (
    <div className="p-10 rounded-[54px] bg-[#FAFAFA] max-w-[420px]">
      <h3 className="text-xl lg:text-3xl text-base-color font-extrabold mb-10">
        {title}
      </h3>

      <p className="text-base-color font-normal mb-10 text-base lg:text-xl">
        {desc}
      </p>

      <a
        href={href}
        className="flex items-center justify-center bg-base-color text-base lg:text-xl text-white h-14 px-5 w-48 rounded-full font-extrabold"
      >
        Choose
      </a>
    </div>
  );
};

export default FrontPage;
