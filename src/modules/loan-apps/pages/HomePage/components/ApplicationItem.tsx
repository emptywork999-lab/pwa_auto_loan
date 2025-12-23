import { useNavigate } from "react-router-dom";

import { useTranslate } from "@common/hooks";

import { ClockCircleOutlined, FileTextOutlined, SignatureOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";

import { CreditApplicationStatusType, useMainContext, type LoanParamsType } from "../../../contexts";
import styled from "styled-components";

const { Paragraph, Title } = Typography;

const StyledCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (width <= 768px) {
    width: 100%;
  }
`;

export const ApplicationItem = ({ loan }: { loan: LoanParamsType; index: number }) => {
  const { setCurrentLoan } = useMainContext();
  const { translate } = useTranslate();
  const navigate = useNavigate();

  const onSetCurrentLoan = () => {
    setCurrentLoan(loan);
    switch (loan.status) {
      case CreditApplicationStatusType.SUBMITTED:
        navigate("/loan-apps/new");
        break;
      case CreditApplicationStatusType.PROPOSALS_READY:
        navigate(`/loan-apps/proposals/${loan?.id}`);
        break;
      case CreditApplicationStatusType.READY_FOR_SIGNATURE:
        navigate(`/loan-apps/accept-loan/${loan?.id}`);
        break;
    }
  };

  switch (loan?.status) {
    case CreditApplicationStatusType.SUBMITTED:
    case undefined:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_application")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <ClockCircleOutlined /> {translate("application_sent")}
          </Title>
          <Paragraph type="secondary">{translate("step2.infoDescription")}</Paragraph>
        </StyledCard>
      );
    case CreditApplicationStatusType.PROPOSALS_READY:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_proposals")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <FileTextOutlined /> {translate("proposals_received")}
          </Title>
          <Paragraph type="secondary">{translate("proposals_desc")}</Paragraph>
        </StyledCard>
      );
    case CreditApplicationStatusType.READY_FOR_SIGNATURE:
      return (
        <StyledCard actions={[<Button onClick={onSetCurrentLoan}>{translate("go_to_signing")}</Button>]}>
          <Title level={4} style={{ margin: 0 }}>
            <SignatureOutlined /> {translate("ready_for_signature")}
          </Title>
          <Paragraph type="secondary">{translate("step5.success")}</Paragraph>
        </StyledCard>
      );
  }
};
