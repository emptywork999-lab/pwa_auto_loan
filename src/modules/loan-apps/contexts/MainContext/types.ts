import type { Dispatch, SetStateAction } from "react";

export enum CreditApplicationStatusType {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  PROPOSALS_READY = "PROPOSALS_READY",
  READY_FOR_SIGNATURE = "READY_FOR_SIGNATURE",
}
export interface MainContextType {
  activeApplications: LoanParamsType[];
  setActiveApplications: Dispatch<SetStateAction<LoanParamsType[]>>;
  currentLoan: LoanParamsType;
  setCurrentLoan: Dispatch<SetStateAction<LoanParamsType>>;
  onSaveLoanParams: (form: FormType) => void;
}

export interface ProposalType {
  id: number;
  amount: number;
  interest: number;
  term: number;
  payment: number;
  loanDuration: string;
}
export interface PersonalInfoType {
  firstName: string;
  lastName: string;
  passport: string;
  company: string;
  position: string;
  salary: string;
  birthDate: string;
  residenceAddress?: string;
  registrationAddress?: string;
}
export interface LoanParamsType {
  personalInfo?: PersonalInfoType;
  loanParams?: {
    loanPurpose: string;
    loanAmount: number;
    creditProgram: string;
    loanTerm: number;
    downPayment: number;
  };
  employmentIncome?: {
    employerName?: string;
    employmentType: string;
    employerInn: string;
    position: string;
    workExperience: number;
    monthlyIncome: number;
  };
  carInfo?: {
    vin: number;
  };
  agree?: boolean;
  selectedProposal?: ProposalType;
  status?: CreditApplicationStatusType;
  id?: string;
}

export type FormType = Record<string, string | boolean | ProposalType>;
