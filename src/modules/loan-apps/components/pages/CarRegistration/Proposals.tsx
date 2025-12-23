import { Card, List, Typography, Space, Tag, Button, Select } from "antd";
import { useMainContext, type ProposalType } from "../../../contexts";
import { useTranslate } from "@common/hooks";
import { ActionsWrapper } from "../../ActionsWrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useGetProposals } from "../../../hooks";

const { Title } = Typography;

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledListItem = styled(List.Item)`
  padding: 16px 0;

  @media (width <= 768px) {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const BtnsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  height: fit-content;
  margin-left: auto;

  @media (width <= 768px) {
    margin-top: 20px;
    flex-wrap: wrap;
  }
`;

export const Proposals = () => {
  const { currentLoan } = useMainContext();
  const { translate, formatNumber } = useTranslate();
  const [selectedSignType, setSelectedSignType] = useState("electronicSigning");
  const navigate = useNavigate();
  const { data } = useGetProposals(currentLoan?.applicationId);

  const proposals: ProposalType[] = [
    {
      id: 1,
      amount: 500000,
      interest: 7.5,
      term: 60,
      payment: 10000,
      loanDuration: "01.12.2026",
    },
    {
      id: 2,
      amount: 450000,
      interest: 8.0,
      term: 48,
      payment: 13000,
      loanDuration: "05.12.2026",
    },
  ];
  console.log(data);
  const getTermText = (term: number) => {
    const months = translate("step3.term").toLowerCase().includes("month") ? "months" : "месяцев";
    return `${term} ${months}`;
  };

  const signingOptions = [
    {
      value: "electronicSigning",
      label: translate("electronicSigning"),
    },
    {
      value: "manualSigning",
      label: translate("manualSigning"),
    },
  ];

  return (
    <Card title={translate("step3.title")}>
      <Title level={5} style={{ marginBottom: 24 }}>
        {translate("step3.availableProposals")}
      </Title>
      <List
        dataSource={proposals}
        renderItem={(proposal) => (
          <StyledListItem>
            <List.Item.Meta
              title={
                <StyledSpace>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>{formatNumber(proposal.amount)} ₽</span>
                  <Tag color="blue">
                    {translate("step3.interest")}: {proposal.interest}%
                  </Tag>
                  <Tag color="green">
                    {translate("step3.term")}: {getTermText(proposal.term)}
                  </Tag>
                  <Tag color="green">
                    {translate("step7.monthlyPayment")}: {formatNumber(proposal.payment)} ₽
                  </Tag>
                  <Tag color="red">
                    {translate("step7.loan_duration")}: {proposal.loanDuration}
                  </Tag>
                </StyledSpace>
              }
              description={translate("step3.fixedRate")}
              style={{ width: "100%" }}
            />
            <BtnsWrapper>
              <Select options={signingOptions} value={selectedSignType} onChange={setSelectedSignType} />
              <Button type="primary" onClick={() => navigate(`/loan-apps/${currentLoan?.applicationId}/car-info`)}>
                {translate("step3.select")}
              </Button>
            </BtnsWrapper>
          </StyledListItem>
        )}
      />
      <ActionsWrapper>
        <Button onClick={() => navigate("/loan-apps")}>{translate("step3.refuse")}</Button>
      </ActionsWrapper>
    </Card>
  );
};
