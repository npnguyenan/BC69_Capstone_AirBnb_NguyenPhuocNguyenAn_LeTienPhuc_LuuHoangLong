import React, { useState } from "react";
import Title from "antd/es/typography/Title";
import { Modal, Form, Input, Button, Select, Divider } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  FacebookOutlined,
  GoogleOutlined,
  AppleOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

// Định nghĩa kiểu cho các props
interface SignupComponentProps {
  log?: boolean;
  onOk: () => void;
  onCancel: () => void;
}
const countries = [
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
  { code: "MY", name: "Malaysia", dialCode: "+60" },
  { code: "VN", name: "Vietnam", dialCode: "+84" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "PH", name: "Philippines", dialCode: "+63" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  // Bạn có thể thêm các quốc gia khác tại đây
];

const LoginComponent: React.FC<SignupComponentProps> = ({
  log,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          Log in or sign up
        </div>
      } // Căn giữa tiêu đề
      open={log}
      onCancel={onCancel}
      footer={null}
      width={479} // Điều chỉnh width của Modal (px)
      centered // Căn giữa toàn bộ Modal trên trang
    >
      <div
        style={{
          backgroundColor: "white",
          margin: "40px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <Title level={3} className="font-semibold text-2xl">
          Welcome to Airbnb
        </Title>
        {/* <Form form={form} layout="vertical" onFinish={handleSubmit}> */}
        <Form form={form} layout="vertical">
          {email ? (
            <>
              <Form.Item className="mb-4">
                <Input
                  placeholder="Email"
                  className="mb-2 p-2 text-lg h-10"
                ></Input>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Country/Region" className="mb-4">
                <Select
                  className="h-10"
                  defaultValue={selectedCountry.name}
                  onChange={(value) => {
                    const country = countries.find((c) => c.name === value);
                    if (country) {
                      setSelectedCountry(country);
                    }
                  }}
                >
                  {countries.map((country) => (
                    <Select.Option key={country.code} value={country.name}>
                      {country.name} {country.dialCode}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="mb-4">
                <PhoneInput
                  inputClass="h-10"
                  country={selectedCountry.code.toLowerCase()}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </>
          )}

          {email && (
            <Form.Item className="mb-4">
              <Input
                placeholder="Password"
                className="mb-2 p-2 text-lg h-10"
              ></Input>
            </Form.Item>
          )}
          <h1 className="text-xs mb-4">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </h1>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
              className="bg-rose-700 h-12 text-white font-bold py-2 px-4 rounded w-11/12"
            >
              {email ? "Agree and Continue" : "continue"}
            </Button>
          </Form.Item>
        </Form>

        <Divider>or</Divider>

        <Button
          block
          icon={<FacebookOutlined />}
          style={{ marginBottom: "10px" }}
        >
          Continue with Facebook
        </Button>
        <Button
          block
          icon={<GoogleOutlined />}
          style={{ marginBottom: "10px" }}
        >
          Continue with Google
        </Button>
        <Button block icon={<AppleOutlined />} style={{ marginBottom: "10px" }}>
          Continue with Apple
        </Button>

        <Button
          onClick={() => setEmail(!email)}
          block
          icon={email ? <PhoneOutlined /> : <MailOutlined />}
        >
          {email ? "Continue with Phone" : "Continue with Email"}
        </Button>
      </div>
    </Modal>
  );
};

export default LoginComponent;
