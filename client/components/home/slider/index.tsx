import { useContext, useEffect, useRef, useState } from "react";
import { clamp } from "../../../../shared/math";

import { SliderContext } from "../SliderContext";
import { sliderInfos } from "./constants";
import { SliderStoreSetupItem } from "./SliderStoreItem";

let interval: NodeJS.Timeout;

export const Slider = () => {
  const { activeIndex, setActiveIndex } = useContext(SliderContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const itemWidth = Math.floor(Math.min(window.innerWidth - 64, 391));

  useEffect(() => {
    if (window) {
      scrollToIndex(0);
      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cleanUpInterval();

    interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % 4; // short hand of: prev >= 3 ? 0 : prev + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000);

    return () => {
      cleanUpInterval();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveIndex]);

  const scrollToIndex = (index: number) => {
    const visibleWindowWidth = clamp(
      100,
      window.innerWidth,
      itemWidth * 2 + itemWidth / 2
    );
    const baseOffSet = visibleWindowWidth / 2 - itemWidth / 2;
    const translateX = Math.floor(baseOffSet - index * itemWidth);

    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  const cleanUpInterval = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

  return (
    <div className="flex flex-col -mt-32 lg:mt-0">
      <div
        className={`overflow-clip`}
        style={{
          maxWidth: `${clamp(
            100,
            window.innerWidth,
            itemWidth * 2 + itemWidth / 2
          )}px`,
        }}
      >
        <div
          ref={scrollRef}
          className={`flex flex-1 transition-all duration-500`}
        >
          {isReady
            ? sliderInfos.map((item, index) => {
                return (
                  <SliderStoreSetupItem
                    key={`preview-set-up-menu-step-${index}`}
                    itemWidth={itemWidth}
                    src={item.imageSrc}
                    active={activeIndex === index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
