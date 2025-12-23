import { Control, FieldErrors, UseFormClearErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export type NewRequestType = {
  requestedSum: number;
  requestedRepaymentPeriod: number;
  cellPhone: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  accountNumber?: string;
};

export type RequestType = {
  cellPhone: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  dateOfBirth: Date;
};

interface PartDataType {
  pepFlag: boolean;
  cellPhone: string;
  analyticsTags: {
    gaid: string;
    wmId: string;
    gclid: string;
    fbclid: string;
    clickId: string;
    utmTerm: string;
    utmMedium: string;
    utmSource: string;
    utmContent: string;
    utmPresent: boolean;
    utmCampaign: string;
  };
  chosenProduct: {
    refCode: string;
    currency: string;
    productId: string;
    requestedSum: number;
    recalculationAmount: number;
    requestedRepaymentPeriod: number;
  };
  deviceDetails: {
    ipAddress: string;
    devFingerprint: string;
    fingerprintVisitorId: string;
    geolocation: {
      latitude: number;
      longitude: number;
    };
  };
}

export type FullDataType = PartDataType & {
  email: string;
  gender: string;
  address: {
    city: string;
    state: string;
    street: string;
    zipCode: string;
    stateChr: string;
    municipality: string;
    neighborhood: "AVANTE";
    municipalityName: "COYOACAN";
  };
  birthDate: "1970-08-25";
  cellPhone: "529999998811";
  firstName: "Sarahn500";
  externalId: [
    {
      system: "openPay";
      externalUserId: "123456789";
    },
  ];
  occupation: "TRANSPORT";
  stateOfBirth: "CL";
  attachedFiles: [
    {
      link: "s3://dev-documents-monetech-17yti/3e1c49fe-6f84-4823-911a-1d9992f406ce/1mb-jpg-file-tst-6.jpg";
      attachmentType: "SELFIE";
    },
  ];
  lastNameFather: "Paulon400";
  lastNameMother: "Toledan500";
  linkedDocuments: [
    {
      validTo: "2033-12-31";
      documentId: "FLGRAM77082428H500";
      documentType: "INE";
      linkFirstPage: "s3://dev-documents-monetech-17yti/3e1c49fe-6f84-4823-911a-1d9992f406ce/7mb-tst-5.jpg";
      linkSecondPage: "s3://dev-documents-monetech-17yti/3e1c49fe-6f84-4823-911a-1d9992f406ce/2mb-tst-4.jpg";
    },
    {
      documentId: "NUB170666KI3";
      documentType: "RFC";
    },
  ];
};

export interface ApplicationRequestType {
  regDate: string;
  participant?: object;
  userId: string;
}

export interface ApplicationPutRequestType {
  applicationId: string;
  userId?: string;
  participant: object;
}

export interface AppStatusType {
  appId: string;
  status?: string;
  isLoading: boolean;
  isError: boolean;
}

export type StatusType = {
  appStatusRecord: {
    appStatus: string;
    statusSetDttm: string;
  };
};

export type CommentType = {
  id: string;
  commentText: string;
};

export type ApplicationType = {
  applicationId: string;
  regDate: string;
  participant: FullDataType;
};

export type ProcessInstanceType = {
  bpmnProcessId: string;
  variables: {
    appId: string;
  };
};

export type FactType = {
  id: string;
  applicationId: string;
  systemId: string;
  factType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonFact?: any;
};

export type CompleteAppRequestType = {
  applicationId: string;
  systemId: string;
  factType: string;
  userId: string;
  jsonFact: object;
};

export type FormType = {
  control: Control<NewRequestType>;
  errors: FieldErrors<NewRequestType>;
  setValue: UseFormSetValue<NewRequestType>;
  trigger: UseFormTrigger<NewRequestType>;
  clearErrors: UseFormClearErrors<NewRequestType>;
};
