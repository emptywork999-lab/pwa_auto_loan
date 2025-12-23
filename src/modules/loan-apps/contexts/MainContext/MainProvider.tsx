import { useState, type ReactNode } from "react";
import { MainContext } from "./MainContext";
import { mockLoans } from "./mockLoans";
import { LoanParamsType, ProposalType } from "./types";

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [activeApplications, setActiveApplications] = useState<LoanParamsType[]>(mockLoans ?? []);
  const [currentLoan, setCurrentLoan] = useState<LoanParamsType>({});

  const onSaveLoanParams = (form: Record<string, string | boolean | ProposalType>) => {
    setCurrentLoan((prev) => {
      const payload = { ...prev, ...form };
      return payload;
    });
  };

  return (
    <MainContext.Provider
      value={{
        activeApplications,
        setActiveApplications,
        currentLoan,
        setCurrentLoan,
        onSaveLoanParams,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
