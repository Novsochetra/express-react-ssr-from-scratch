import React from "react";

import { SliderProvider } from "./slider/SliderProvider";
import { Slider } from "./slider";
import { SetUpStoreDesc } from "./SetUpStoreDesc";
import { clamp } from "../../../shared/math";

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

const searchParams = new Map();

export const DefaultHomePage = () => {
  const locale = searchParams.get("locale") || "kh";
  const itemWidth = Math.min(window.innerWidth - 64, 391);
  const iframeWidth = Math.floor((360 / 391) * itemWidth);
  const iframeHeight = Math.floor((732 / 391) * itemWidth);
  const borderRadius = Math.floor(
    clamp(8, Math.min((41 / 391) * itemWidth), 41)
  );

  return (
    <>
      <header className="p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="logo.svg" className="max-h-12" alt="xmenu logo" />
      </header>

      <div className="hidden lg:block absolute overflow-clip top-0 right-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="top-right-background"
          src="./top-right-background.svg"
          className="max-h-[672px] -translate-y-32 xl:translate-y-0"
        />
      </div>

      <section
        className={`flex flex-1 flex-col lg:flex-row gap-20 lg:gap-0 relative h-[100vh-h-12] overflow-x-clip`}
      >
        <div className="flex flex-col flex-1 justify-center relative mt-10">
          <div className="absolute -z-10 overflow-x-clip top-[0px]">
            <svg
              width="814"
              height="695"
              viewBox="0 0 814 695"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-125 translate-y-[8px] -translate-x-[148px] -rotate-[17deg]"
            >
              <path
                d="M597.362 104.637C673.285 145.163 768.33 173.869 800.949 232.97C833.005 291.507 802.074 380.44 750.896 439.54C699.718 498.641 628.856 528.472 568.118 550.987C507.942 573.501 457.889 589.261 383.09 623.033C308.854 656.805 209.873 708.588 131.7 691.702C54.0898 674.816 -2.71197 588.699 0.0999951 505.395C2.34957 421.528 63.6505 340.476 105.268 265.053C146.885 189.629 167.693 119.834 214.934 70.3024C262.176 20.7705 334.724 -8.49828 399.962 2.1961C464.637 13.4533 521.439 64.6738 597.362 104.637Z"
                fill="#00A6F4"
              />
            </svg>
          </div>

          <div className="ml-10">
            <h2 className="text-3xl lg:text-5xl text-white mb-5 max-w-[300px] lg:max-w-[600px] font-extrabold">
              Explore experience emenu
            </h2>

            <p className="text-base lg:text-xl text-white max-w-[352px] leading-7 lg:max-w-[600px] mb-9">
              Create beautiful, customizable digital menus a minute. Choose from
              ready-made themes and tailor your menu to match your brand — no
              design skills needed.
            </p>

            <div className="flex flex-row gap-6 sm:gap-6 flex-wrap">
              <a
                href={`${
                  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
                }?text=${encodeURIComponent(generalMessage)}`}
                className="flex items-center justify-center bg-base-color text-base lg:text-xl text-white h-14 px-5 w-48 rounded-full font-extrabold"
              >
                Contact Us
              </a>

              <a
                href={`store/xmenu-store-demo`}
                target="_blank"
                className="flex items-center justify-center border border-white bg-transparent text-base lg:text-xl text-white h-14 px-5 w-48 rounded-full font-normal"
              >
                Demo
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center calc">
          <div className="relative overflow-hidden">
            <svg
              width={itemWidth}
              height={(747 * itemWidth) / 391}
              viewBox="0 0 391 747"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M383 246V246C387.418 246 391 249.582 391 254V331C391 335.418 387.418 339 383 339V339V246Z"
                fill="#DED7D0"
              />
              <path
                d="M8 147H4C1.79086 147 0 145.209 0 143V111C0 108.791 1.79086 107 4 107H8V147Z"
                fill="#DED7D0"
              />
              <path
                d="M8 235V235C3.58172 235 0 231.418 0 227V183C0 178.582 3.58172 175 8 175V175V235Z"
                fill="#DED7D0"
              />
              <path
                d="M8 323V323C3.58172 323 0 319.418 0 315V271C0 266.582 3.58172 263 8 263V263V323Z"
                fill="#DED7D0"
              />
              <rect
                x="12"
                y="4"
                width="367.044"
                height="738.595"
                rx="44"
                stroke="url(#paint0_linear_45_407)"
                strokeWidth="8"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_45_407"
                  x1="16"
                  y1="8"
                  x2="337.413"
                  y2="754.792"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E5DED8" />
                  <stop offset="1" stopColor="#D8D0CA" />
                </linearGradient>
              </defs>
            </svg>
            <iframe
              src={`store/xmenu-store-demo?locale=${locale}`}
              className={`absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-[${borderRadius}px]`}
              style={{
                borderRadius: `${borderRadius}px`,
                width: `${iframeWidth}px`,
                height: `${iframeHeight}px`,
              }}
            ></iframe>
          </div>
        </div>
      </section>

      <SliderProvider>
        <section
          className={`flex flex-1 gap-0 flex-col-reverse lg:flex-row -mt-20 lg:mt-60`}
        >
          <Slider />

          <div className="flex lg:block lg:absolute lg:right-0 overflow-x-clip -z-10 lg:z-10">
            <div className="relative flex w-full sm:w-auto ml-auto mr-auto lg:left-0 lg:translate-x-16">
              <svg
                width="699"
                height="779"
                viewBox="0 0 699 779"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[533px] h-[593px] [transform:rotateY(180deg)_scale(1.5)] lg:w-[699px] lg:h-[799px] lg:scale-100 lg:[transform:rotateY(0deg)]"
              >
                <path
                  d="M574.225 98.5404C635.215 140.822 690.442 189.83 698.126 248.448C705.329 307.066 665.95 374.813 655.385 446.884C645.3 519.435 664.51 595.831 644.34 661.655C624.17 727 563.66 781.774 500.749 778.891C437.358 776.008 371.086 715.949 294.248 692.886C216.93 669.824 129.528 684.238 85.8262 650.605C42.605 617.452 43.5655 536.252 30.5991 456.013C17.6328 375.774 -9.26036 296.976 3.22575 222.022C15.7119 147.068 68.0575 76.4386 136.731 38.0007C205.885 -0.917695 291.847 -7.16385 368.685 6.76988C445.522 21.1841 512.755 56.2587 574.225 98.5404Z"
                  fill="#00A6F4"
                />
              </svg>

              <SetUpStoreDesc />
            </div>
          </div>
        </section>
      </SliderProvider>

      <section className="flex flex-col relative items-center mt-32">
        <div className="relative flex max-h-[257px] items-center justify-center mb-16">
          <svg
            width="257"
            height="180"
            viewBox="0 0 257 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6914 23.7853C31.3842 8.91587 55.4552 3.28114 76.4001 1.08986C97.3451 -0.944907 115.164 0.463783 134.858 0.620303C154.397 0.933343 175.967 -0.162303 194.723 7.97675C213.324 16.1158 229.267 33.4896 241.146 55.5589C253.025 77.6283 260.997 104.393 254.901 127.402C248.961 150.567 228.954 170.132 206.29 176.549C183.469 182.966 157.992 176.236 135.484 176.236C112.976 176.236 93.5937 182.966 77.1817 178.427C60.7696 174.045 47.4836 158.549 33.7287 141.645C20.1302 124.584 6.06267 106.115 1.52981 84.6717C-2.84674 63.2284 2.15503 38.8113 16.6914 23.7853Z"
              fill="#00A6F4"
            />
          </svg>

          <h2 className="font-extrabold text-3xl lg:text-5xl text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            Pricing
          </h2>
        </div>

        <div className="p-4">
          <p className="text-base-color font-normal text-base lg:text-xl mb-20 max-w-[881px] text-center">
            Start with a{" "}
            <span className="italic font-extrabold">30-day free trial</span> —
            no credit card required. When you&lsquo;re ready,{" "}
            <span className="italic font-extrabold">upgrade</span> to a plan
            that fits your needs.
          </p>
        </div>

        <div className="flex gap-10 p-4 flex-col lg:flex-row lg:flex-wrap">
          <PriceCard
            title="Free Trial (30 Days)"
            desc="Explore all features, design your menu, and see how xmenu fits your
        business."
            href={`${
              process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
            }?text=${encodeURIComponent(freeTrailMessage)}`}
          />
          <PriceCard
            title="$5 / Month"
            desc="Ideal for restaurants and cafés ready to go digital. Full access to all features."
            href={`${
              process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
            }?text=${encodeURIComponent(monthlyPlanMessage)}`}
          />
          <PriceCard
            title="$30 / Year"
            desc="Best value. Save 33% with a yearly plan and enjoy seamless 
service all year round."
            href={`${
              process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
            }?text=${encodeURIComponent(yearlyPlanMessage)}`}
          />
        </div>
      </section>

      <section className="p-4 sm:16 relative">
        <div className="block lg:hidden absolute -left-40 top-60 -z-10">
          <svg
            width="307"
            height="306"
            viewBox="0 0 307 306"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.4172 34.084C101.073 25.4854 118.18 5.39879 139.292 1.53945C160.119 -2.27578 185.053 9.97642 205.485 26.0972C225.916 42.2181 241.663 62.0918 260.12 84.1364C278.679 106.021 299.766 129.961 304.85 154.949C309.854 179.662 298.936 205.699 286.193 232.596C273.268 259.377 258.701 287.133 234.033 298.603C209.365 310.072 174.777 305.37 140.614 301.61C106.349 298.01 72.2239 295.396 51.4316 277.027C30.5377 258.818 22.8748 225.013 19.821 196.829C16.8478 168.92 18.382 146.791 12.5902 120.904C6.98038 95.1333 -6.23919 65.6495 4.61795 52.5836C15.293 39.402 49.579 42.5669 75.4172 34.084Z"
              fill="#00A6F4"
            />
          </svg>
        </div>
        <div className="pb-20 mt-10 lg:mt-0 lg:py-48">
          <div className="hidden lg:flex relative max-h-[257px] flex-col items-center justify-center mb-16 ">
            <svg
              width="225"
              height="202"
              viewBox="0 0 225 202"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-1/2 -translate-x-1/2"
            >
              <path
                d="M183.12 12.7641C203.89 23.2466 222.943 39.0487 224.817 58.1363C226.847 77.3805 211.542 100.067 201.86 119.154C192.021 138.085 188.117 153.418 179.996 168.438C171.876 183.301 159.694 197.852 145.015 201.137C130.179 204.579 112.844 196.6 88.1692 196.756C63.6507 196.913 32.1047 205.205 16.9563 195.192C1.80796 185.022 3.36964 156.391 1.96412 129.793C0.558603 103.196 -3.65795 78.6321 7.43002 63.6123C18.518 48.749 44.7543 43.4295 65.6809 32.9469C86.6075 22.6208 102.381 7.13165 121.277 1.96859C140.173 -3.19446 162.505 2.28151 183.12 12.7641Z"
                fill="#00A6F4"
              />
            </svg>

            <div
              className="w-[257px] relative min-h-10 z-20"
              style={{
                maskImage: "url(mask-custom-build-menu.png)",
                WebkitMaskImage: "url(mask-custom-build-menu.png)",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <h2 className="font-extrabold text-5xl text-center absolute left-1/2 -translate-x-1/2 text-white text-nowrap">
                Custom Menus Built Just for You
              </h2>
            </div>

            <h2 className="font-extrabold text-5xl absolute text-base-color bg-transparent top-0 z-10">
              Custom Menus Built Just for You
            </h2>
          </div>

          <div className="block lg:hidden">
            <h2 className="font-extrabold text-3xl text-center">
              Custom Menus
              <br />
              <span className="text-[#00A6F4]">
                <i>Built</i>
              </span>{" "}
              Just{" "}
              <span className="text-[#00A6F4]">
                <i>for You</i>
              </span>
            </h2>
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-16 rounded-[54px]">
          <h3 className="max-w-[696px] text-3xl lg:text-5xl text-base-color mb-5">
            Want something{" "}
            <span className="font-extrabold italic">truly unique</span> ? Let’s
            <span className="font-extrabold italic">work</span> together
          </h3>

          <p className="text-base-color text-base lg:text-xl mb-10">
            If our ready-made themes don’t quite match your vision, we offer
            personalized design support. Work directly with our team to create a
            custom menu tailored exactly to your brand.
          </p>

          <a
            href={`${
              process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
            }?text=${encodeURIComponent(customizeMessage)}`}
            className="flex items-center justify-center bg-base-color text-base lg:text-xl text-white h-14 px-5 w-48 rounded-full font-extrabold"
          >
            Contact Us
          </a>
        </div>
      </section>

      <footer className="relative">
        <div className="w-full h-auto">
          <svg
            className="w-full h-60"
            viewBox="0 0 402 172"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-128 172V35.4462C-98.4404 44.3329 -68.8808 53.2195 -30.2813 48.5554C8.31825 43.8912 55.9576 25.6763 96.3229 28.8916C136.688 32.107 169.779 56.7526 201.417 47.4629C233.054 38.1733 263.237 -5.05175 306.51 0.488435C349.784 6.02862 406.147 60.334 441.104 72.5888C476.061 84.8437 489.613 55.048 516.698 37.6311C543.783 20.2141 584.402 15.1759 626.708 16.8749C669.014 18.5739 713.007 27.01 757 35.4462V172H-128Z"
              fill="#00A6F4"
            />
          </svg>
        </div>

        <div className="absolute bottom-10 w-full text-center">
          <div className="flex gap-5 items-center justify-center mb-5">
            <a
              href={`${
                process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL
              }?text=${encodeURIComponent(generalMessage)}`}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 0C31.0461 0 40 8.95391 40 20C40 31.0461 31.0461 40 20 40C8.95391 40 0 31.0461 0 20C0 8.95391 8.95391 0 20 0ZM26.8991 28.1522C27.267 27.0235 28.9904 15.7748 29.2035 13.5583C29.2678 12.887 29.0557 12.4409 28.64 12.2417C28.1374 12 27.393 12.1209 26.5296 12.4322C25.3452 12.8591 10.2043 19.2878 9.32956 19.66C8.5 20.0122 7.71565 20.3965 7.71565 20.953C7.71565 21.3443 7.94783 21.5643 8.58783 21.793C9.25391 22.0304 10.9313 22.5391 11.9217 22.8122C12.8757 23.0757 13.9617 22.847 14.5704 22.4687C15.2157 22.0678 22.6617 17.0852 23.1965 16.6487C23.7304 16.2122 24.1565 16.7713 23.72 17.2087C23.2835 17.6452 18.1722 22.6061 17.4983 23.293C16.68 24.127 17.2609 24.9913 17.8096 25.3374C18.4365 25.7322 22.9452 28.7565 23.6243 29.2417C24.3035 29.727 24.9922 29.947 25.6226 29.947C26.253 29.947 26.5852 29.1165 26.8991 28.1522Z"
                  fill="white"
                />
              </svg>
            </a>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C8.95455 0 0 9.00057 0 20.1028C0 30.1816 7.38636 38.5033 17.0109 39.9571V25.431H12.0627V20.1467H17.0109V16.6305C17.0109 10.8089 19.8327 8.25311 24.6464 8.25311C26.9518 8.25311 28.1709 8.4249 28.7482 8.50348V13.1162H25.4645C23.4209 13.1162 22.7073 15.0634 22.7073 17.2583V20.1467H28.6964L27.8836 25.431H22.7073V40C32.4691 38.6686 40 30.2794 40 20.1028C40 9.00057 31.0455 0 20 0Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="text-white text-base lg:text-xl">
            © 2025{" "}
            <a href="/" className="italic underline font-bold">
              xmenu.store
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export const PriceCard = ({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) => {
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
