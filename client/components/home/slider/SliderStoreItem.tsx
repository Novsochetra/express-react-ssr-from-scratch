import { useEffect, useState } from "react";
import { clamp } from "../../../../shared/math";

export const SliderStoreSetupItem = ({
  itemWidth,
  className,
  src,
  active,
}: {
  itemWidth: number;
  className?: string;
  src: string;
  active: boolean;
}) => {
  const [svgWidth, setSvgWidth] = useState(
    Math.floor(Math.min(window.innerWidth - 64, 391))
  );

  useEffect(() => {
    const handleResize = () => {
      setSvgWidth(Math.min(window.innerWidth - 64, 391));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const svgHeight = Math.floor((747 / 391) * itemWidth);
  const imageWidth = Math.floor((359 / 391) * svgWidth);
  const imageHeight = Math.floor((734 / 391) * svgWidth);

  const borderRadius = Math.floor(
    clamp(8, Math.min((41 / 391) * itemWidth), 41)
  );

  return (
    <div className={`min-w-[${itemWidth}px] max-w-[${itemWidth}px]`}>
      <div
        className={`relative transition-all duration-200 ${className || ""} ${
          !active ? "scale-[.8] opacity-20" : "scale-1 opacity-100"
        }`}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
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
            stroke="url(#paint0_linear_45_415)"
            strokeWidth="8"
          />
          <defs>
            <linearGradient
              id="paint0_linear_45_415"
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
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 overflow-hidden`}
          style={{
            borderRadius: `${borderRadius}px`,
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
        >
          <img
            src={src}
            width={imageWidth}
            height={imageHeight}
            alt="welcome"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
