import { getAxiosInstance } from "@common/data-access";

import {
  ApplicationRequestType,
  ApplicationPutRequestType,
  ApplicationType,
  ApiClientType,
  ProcessInstanceType,
  StatusType,
  CommentType,
  FactType,
  CompleteAppRequestType,
  ProposalType,
} from "../types";
import { LoanParamsType } from "../contexts";

const axiosLoansInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/application/api/v1",
});

const axiosProposalInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/proposal/api/v1",
});

const appStatusApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/status/api/v1/statuses",
});

const appCommentApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/comments/v1",
});

const processApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/bpmn-camunda-process",
});

const factsApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/dms-facts/v1",
});

const bffApiInstance = getAxiosInstance({
  baseURL: window._REACT_APP.basePath + "/bff-front/v1",
});

const getApplicationsList = async (userId: string) => {
  const { data } = await axiosLoansInstance.request<LoanParamsType[]>({
    url: "/applications",
    method: "GET",
    params: {
      userId: userId,
    },
  });

  return data;
};

const getProposalsList = async (appId: string) => {
  const { data } = await axiosProposalInstance.request<ProposalType[]>({
    url: `/proposals/${appId}`,
    method: "GET",
  });

  return data;
};

const getApplication = async (id: string) => {
  const { data } = await axiosLoansInstance.request<ApplicationType>({
    url: "/applications/" + id,
    method: "GET",
  });

  return data;
};

const getApplicationStatus = async (appId: string) => {
  const { data } = await appStatusApiInstance.request<StatusType>({
    url: appId,
    method: "GET",
  });

  return data;
};

const getApplicationComment = async (appId: string) => {
  const { data } = await appCommentApiInstance.request<CommentType>({
    url: `/comments/${appId}`,
    method: "GET",
  });

  return data;
};

const sendNewLoanRequest = async (formData: ApplicationRequestType) => {
  try {
    const { data } = await axiosLoansInstance.request({
      url: "/applications",
      method: "POST",
      data: formData,
    });

    return data;
  } catch (error) {
    console.error("Error submitting form", error);
    throw error;
  }
};

const updateLoanRequest = async (formData: ApplicationPutRequestType) => {
  try {
    const { data } = await axiosLoansInstance.request({
      url: "/applications/" + formData.applicationId,
      method: "PUT",
      data: formData,
    });

    return data;
  } catch (error) {
    console.error("Error submitting form", error);
    throw error;
  }
};

const runLoanBp = async (requestData: ProcessInstanceType) => {
  await processApiInstance.request<void>({
    url: "/process-instances",
    method: "POST",
    data: requestData,
  });
};

const getApplicationFacts = async (appId: string) => {
  const { data } = await factsApiInstance.request<FactType[]>({
    url: `facts/${appId}`,
    method: "GET",
  });

  return data;
};

const acceptApplication = async (appId: string) => {
  await bffApiInstance.request<void>({
    url: `/accept/${appId}`,
    method: "POST",
  });
};

const approveApplication = async (appId: string) => {
  await bffApiInstance.request<void>({
    url: `/approve/${appId}`,
    method: "POST",
  });
};

const completeApplication = async (request: CompleteAppRequestType) => {
  await bffApiInstance.request<void>({
    url: `/complete-liveness`,
    method: "POST",
    data: request,
  });
};

const sendCarInfo = async (request: Record<string, string>) => {
  console.log(request);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const apiClient: ApiClientType = {
  getApplicationsList,
  sendNewLoanRequest,
  runLoanBp,
  getApplicationStatus,
  getApplicationComment,
  updateLoanRequest,
  getApplicationFacts,
  getApplication,
  acceptApplication,
  completeApplication,
  approveApplication,
  sendCarInfo,
  getProposalsList,
};
