import { createContext } from "react";
import type { MainContextType } from "./types";

export const MainContext = createContext<MainContextType>({
  activeApplications: [],
  setActiveApplications: () => void 0,
  currentLoan: {},
  setCurrentLoan: () => void 0,
  onSaveLoanParams: () => void 0,
});
