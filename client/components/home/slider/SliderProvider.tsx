import { ReactNode, useState } from "react";
import { SliderContext } from "../SliderContext";

export const SliderProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SliderContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </SliderContext.Provider>
  );
};
