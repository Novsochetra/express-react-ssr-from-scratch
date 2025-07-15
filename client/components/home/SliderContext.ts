import { createContext, Dispatch, SetStateAction } from "react";

type SliderContextType = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export const SliderContext = createContext<SliderContextType>({
  activeIndex: 0,
  setActiveIndex: () => 0,
});
