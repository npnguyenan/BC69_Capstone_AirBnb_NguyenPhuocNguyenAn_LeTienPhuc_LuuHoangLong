import React, { useState } from "react";
import Title from "antd/es/typography/Title";
import { Modal, Input, Button, Divider } from "antd";
import "react-phone-input-2/lib/style.css";
import {
  FacebookOutlined,
  GoogleOutlined,
  AppleOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginMutatuon } from "../../hooks/api";

// Định nghĩa kiểu cho các props
interface LoginTemplateProps {
  log?: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ log, onCancel }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = userLoginMutatuon();
  const [email, setEmail] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // Hàm để toggle trạng thái ẩn/hiện mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // onSubmit chỉ đc gọi khi validation ko có errors
  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    loginMutation.mutate(values);
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontWeight: "bold" }}>Đăng nhập</div>
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
          Airbnb Xin Chào
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-black text-16 mt-1">
            email <span className="text-red-500">*</span>
          </p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" status={errors.email && "error"} {...field} />
            )}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <p className="text-black text-16 mt-1">
            Mật Khẩu <span className="text-red-500">*</span>
          </p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                type={showPassword ? "text" : "password"} // Đổi type giữa text và password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onClick={togglePasswordVisibility} // Chuyển đổi khi bấm vào icon
                status={errors.password && "error"}
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <h1 className="text-xs mb-4">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </h1>

          <Button
            type="primary"
            htmlType="submit"
            block
            className=" h-12 text-white font-bold py-2 px-4 rounded w-[25em] bg-[#FF385C] border-[#FF385C]"
          >
            {email ? "Agree and Continue" : "continue"}
          </Button>
        </form>

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
          disabled
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

export default LoginTemplate;
