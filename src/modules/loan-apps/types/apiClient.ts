import {
  ApplicationRequestType,
  ApplicationPutRequestType,
  ApplicationType,
  CommentType,
  FactType,
  ProcessInstanceType,
  StatusType,
  CompleteAppRequestType,
} from "./type";

export interface ApiClientType {
  getApplicationsList: (userId: string) => Promise<ApplicationType[]>;
  getApplication: (appId: string) => Promise<ApplicationType>;
  sendNewLoanRequest: (application: ApplicationRequestType) => Promise<{ applicationId: string }>;
  runLoanBp: (requestData: ProcessInstanceType) => Promise<void>;
  getApplicationStatus: (appId: string) => Promise<StatusType>;
  getApplicationComment: (appId: string) => Promise<CommentType>;
  updateLoanRequest: (application: ApplicationPutRequestType) => Promise<{ applicationId: string }>;
  getApplicationFacts: (appId: string) => Promise<FactType[]>;
  acceptApplication: (appId: string) => Promise<void>;
  completeApplication: (requestData: CompleteAppRequestType) => Promise<void>;
  approveApplication: (appId: string) => Promise<void>;
  sendCarInfo: (request: Record<string, string>) => Promise<void>;
  getProposalsList: (appId: string) => Promise<ApplicationType[]>;
}
