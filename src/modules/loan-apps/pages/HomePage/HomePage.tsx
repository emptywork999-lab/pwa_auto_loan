import { useNavigate } from "react-router-dom";

import { useTranslate } from "@common/hooks";

import { Card, Button, Empty, Spin } from "antd";

import { useMainContext } from "../../contexts";
import { ApplicationItem } from "./components/ApplicationItem";
import { useGetApplicationsList } from "../../hooks";
import styled from "styled-components";
import { useEffect } from "react";

const StyledApplicationsWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (width <= 768px) {
    flex-direction: column;
  }
`;

const StyledCard = styled(Card)`
  @media (width >= 768px) {
    width: 80%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

export const HomePage = () => {
  const { setCurrentLoan } = useMainContext();
  const { translate } = useTranslate();
  const navigate = useNavigate();

  const { activeApplications } = useMainContext();
  const { applications, isLoading } = useGetApplicationsList();

  useEffect(() => {
    setCurrentLoan({});
    console.log(applications);
  }, [setCurrentLoan, applications]);

  return (
    <Spin spinning={isLoading}>
      <StyledWrapper>
        <StyledCard
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {translate("my_active_applications")}{" "}
              <Button
                type="primary"
                block
                onClick={() => navigate("/loan-apps/new")}
                style={{
                  width: "fit-content",
                }}
              >
                {translate("dashboard.start.button")}
              </Button>
            </div>
          }
        >
          {activeApplications?.length ? (
            <StyledApplicationsWrapper>
              {activeApplications?.map((el, index) => <ApplicationItem loan={el} index={index + 1} key={el.id} />)}
            </StyledApplicationsWrapper>
          ) : (
            <Empty description={translate("no_active_applications")} />
          )}
        </StyledCard>
      </StyledWrapper>
    </Spin>
  );
};
