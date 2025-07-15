import { useContext, useEffect, useRef } from "react";
import { SliderContext } from "./SliderContext";
import { sliderInfos } from "./slider/constants";

const ANIMATION_DURATION = 300; // ms

export const SetUpStoreDesc = () => {
  const { activeIndex } = useContext(SliderContext);

  const h3Ref = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (h3Ref.current) {
      Object.assign(h3Ref.current.style, {
        opacity: "0",
        transform: "translateY(-20px)",
        transition: `all ${ANIMATION_DURATION}ms`,
      });
    }

    if (descRef.current) {
      Object.assign(descRef.current.style, {
        opacity: "0",
        transform: "translateY(-20px)",
        transition: `all ${ANIMATION_DURATION}ms`,
      });
    }

    const midTimeout = setTimeout(() => {
      if (h3Ref.current) {
        Object.assign(h3Ref.current.style, {
          opacity: "0",
          transform: "translateY(20px)",
        });
      }

      if (descRef.current) {
        Object.assign(descRef.current.style, {
          opacity: "0",
          transform: "translateY(20px)",
        });
      }
    }, ANIMATION_DURATION);

    const enteringTimout = setTimeout(() => {
      if (h3Ref.current) {
        Object.assign(h3Ref.current.style, {
          opacity: "1",
          transform: "translateY(0px)",
          transition: `all ${ANIMATION_DURATION}ms`,
        });
      }
    }, ANIMATION_DURATION * 2);

    const enterStaggerTimeout = setTimeout(() => {
      if (descRef.current) {
        Object.assign(descRef.current.style, {
          opacity: "1",
          transform: "translateY(0px)",
          transition: `all ${ANIMATION_DURATION}ms`,
        });
      }
    }, ANIMATION_DURATION * 2 + 100);

    return () => {
      clearTimeout(midTimeout);
      clearTimeout(enteringTimout);
      clearTimeout(enterStaggerTimeout);
    };
  }, [activeIndex]);

  return (
    <div className="absolute h-full p-4 sm:p-16 md:p-20 lg:p-0 lg:ml-20 flex flex-col justify-center lg:max-w-[482px]">
      <h2 className="font-normal text-white text-3xl lg:text-5xl mb-5">
        <span className="font-extrabold">Launch</span> your menu in <br />
        <span className="font-extrabold">4 quick steps.</span>
      </h2>

      <h3
        ref={h3Ref}
        className={`font-extrabold text-white text-xl lg:text-3xl mb-7`}
      >
        {sliderInfos[activeIndex].title}
      </h3>
      <p
        ref={descRef}
        className="text-base lg:text-xl text-white font-normal animate-fade-in-up "
      >
        {sliderInfos[activeIndex].desc}
      </p>
    </div>
  );
};
