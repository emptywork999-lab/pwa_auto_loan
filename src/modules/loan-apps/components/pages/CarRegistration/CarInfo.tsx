import { Card, Form, Input, Button, notification, Spin } from "antd";
import { useEffect } from "react";
import { useTranslate } from "@common/hooks";
import { useFormRules, useSendCarInfo } from "../../../hooks";
import { useMainContext } from "../../../contexts";
import { ActionsWrapper } from "../../ActionsWrapper";
import { useNavigate } from "react-router-dom";

export const CarInfo = () => {
  const { translate } = useTranslate();
  const [form] = Form.useForm();
  const { currentLoan: loanParams } = useMainContext();
  const { isLoading, mutate } = useSendCarInfo();
  const navigate = useNavigate();
  const rules = useFormRules();

  const carPrice = Form.useWatch("carPrice", form);

  useEffect(() => {
    if (carPrice) {
      const kaskoCost = Math.round(carPrice * 0.03);
      form.setFieldValue("kaskoCost", kaskoCost);
    }
  }, [carPrice, form]);

  useEffect(() => {
    form.setFieldsValue(loanParams?.carInfo);
  }, [form, loanParams?.carInfo]);

  const sendCarInfo = (params: Record<string, string>) => {
    mutate(params, {
      onSuccess: () => {
        notification.success({ message: translate("car-info_sent") });
        navigate("/loan-apps");
      },
    });
  };

  return (
    <Spin spinning={isLoading}>
      <Card title={translate("step4.title")}>
        <Form form={form} layout="vertical" onFinish={sendCarInfo} name="carInfo">
          <Form.Item name="vin" label={translate("step4.vin")} rules={[rules.vinRequired()]}>
            <Input placeholder={"1HGBH41JXMN109186"} />
          </Form.Item>
          <Form.Item name="mileage" label={translate("mileage")} rules={[rules.numberRange(0, 999999)]}>
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            name="carPrice"
            label={translate("car_price")}
            rules={[rules.numberRange(0, 13000000, void 0, "maxNumber")]}
          >
            <Input type={"number"} />
          </Form.Item>
          <Form.Item name="kaskoCost" label={translate("kasko_cost")}>
            <Input type={"number"} disabled />
          </Form.Item>
          <ActionsWrapper>
            <Button type="primary" htmlType="submit">
              {translate("loanApps.request.button.submit")}
            </Button>
          </ActionsWrapper>
        </Form>
      </Card>
    </Spin>
  );
};
