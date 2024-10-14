import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Switch,
} from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  AppleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "../styles/SignupCustomer.css";
import "react-phone-input-2/lib/style.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { userRegisterMutation } from "../hooks/api";
import { RegisterSchema, RegisterSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

// Định nghĩa kiểu cho các props
interface SignupComponentProps {
  sign?: boolean;
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

export const SignupComponent: React.FC<SignupComponentProps> = ({
  sign,
  onOk,
  onCancel,
}) => {
  const registerMutation = userRegisterMutation();
  //const dispatch = useAppDispatch()
  //const { isLoadingRegister } = useuserSelector()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  console.log("errors: ", errors);

  // onSubmit chỉ đc gọi khi validation ko có errors
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    registerMutation.mutate(values);
  };

  const [showPassword, setShowPassword] = useState(false);

  // Hàm để toggle trạng thái ẩn/hiện mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          Log in or sign up
        </div>
      } // Căn giữa tiêu đề
      open={sign}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <Input type="number" status={errors.id && "error"} {...field} />
            )}
          />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}
          <p className="text-black text-16 mt-1">
            Tên <span className="text-red-500">*</span>
          </p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input type="text" status={errors.name && "error"} {...field} />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
            password <span className="text-red-500">*</span>
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
          <p className="text-black text-16 mt-1">
            phone <span className="text-red-500">*</span>
          </p>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input status={errors.phone && "error"} {...field} />
            )}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
          <p className="text-black text-16 mt-1">
            ngày sinh <span className="text-red-500">*</span>
          </p>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="DD/MM/YYYY"
                value={field.value ? moment(field.value, "DD/MM/YYYY") : null}
                onChange={(date) =>
                  field.onChange(date ? date.format("DD/MM/YYYY") : null)
                }
              />
            )}
          />
          {errors?.birthday?.message && (
            <p className="text-red-500">{errors?.birthday?.message}</p>
          )}
          <p className="text-black text-16 mt-1">
            giới tính <span className="text-red-500">*</span>
          </p>
          <Controller
            name="gender"
            control={control}
            defaultValue={false} // Mặc định là Female (false)
            render={({ field }) => (
              <Switch
                checkedChildren="Male" // Giá trị "true" đại diện cho Male
                unCheckedChildren="Female" // Giá trị "false" đại diện cho Female
                checked={field.value} // Nếu giá trị là true thì chọn Male
                onChange={(checked) => field.onChange(checked)} // Cập nhật giá trị khi switch
              />
            )}
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
          <p className="text-black text-16 mt-1">
            quyền <span className="text-red-500">*</span>
          </p>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                className=" w-[6em]"
                {...field}
                options={[
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                ]}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          <h1 className="text-xs mb-4">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </h1>
          <Button
            type="primary"
            htmlType="submit"
            loading={registerMutation.isPending}
            className="h-12 text-white font-bold py-2 px-4 rounded w-[25em] bg-[#FF385C] border-[#FF385C]"
          >
            Đăng Ký
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

        {/* <Button
          onClick={() => setEmail(!email)}
          block
          icon={email ? <MailOutlined /> : <PhoneOutlined />}
        >
          {email ? "Continue with Phone" : "Continue with Email"}
        </Button> */}
      </div>
    </Modal>
  );
};
