import "./base.out.css";
import React from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const TELEGRAM_URL = `https://t.me/SochetraNOV`;
const freeTrailMessage = `
🧪 **Free Trial Request**:

Hi, I'm interested in the **Free Trial (30 Days)** plan for XMenu. I'd like to explore all features and see how it fits my business. Please guide me on how to get started.
`;

const monthlyPlanMessage = `
💵 **Monthly Plan Inquiry**:

Hi, I'm ready to subscribe to the **$5/month plan** for XMenu. Please assist me with the next steps to activate my account.
`;

const yearlyPlanMessage = `
📆 **Yearly Plan Request**:

Hi, I’d like to go with the **$30/year plan** for XMenu. Please let me know how to proceed with payment and setup.
`;

const customizeMessage = `
🛠️ **Customize Menu Request**:

Hi, I’m setting up my restaurant menu on XMenu and would like assistance with customization.
`;

const generalMessage = `
💬 **General Inquiry**:

Hi, I’d like to learn more about XMenu. Can you help me get started?
`;

const windowWidth = 478;
const itemWidth = Math.min(-64, 391);
const iframeWidth = Math.floor((360 / 391) * itemWidth);
const iframeHeight = Math.floor((732 / 391) * itemWidth);
const borderRadius = Math.floor(clamp(8, Math.min((41 / 391) * itemWidth), 41));

export const DefaultHomePage = () => {
  const locale = "en";

  return (
    <>
      <PriceCard
        title="Free Trial (30 Days)"
        desc="Explore all features, design your menu, and see how xmenu fits your
        business."
        href={`${TELEGRAM_URL}?text=${encodeURIComponent(freeTrailMessage)}`}
      />
      <PriceCard
        title="Free Trial (30 Days)"
        desc="Explore all features, design your menu, and see how xmenu fits your
        business."
        href={`${TELEGRAM_URL}?text=${encodeURIComponent(freeTrailMessage)}`}
      />
      <PriceCard
        title="Free Trial (30 Days)"
        desc="Explore all features, design your menu, and see how xmenu fits your
        business."
        href={`${TELEGRAM_URL}?text=${encodeURIComponent(freeTrailMessage)}`}
      />
    </>
  );
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

export default DefaultHomePage;
