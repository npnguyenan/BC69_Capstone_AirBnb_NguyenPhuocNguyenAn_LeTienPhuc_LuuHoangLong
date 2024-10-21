import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { InputUserSchema, InputUserSchemaType } from "../../schemas";

import { useAddUserMutation, useUpdateUserMutation } from "../../hooks/api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  userActions,
  useQuanLyNguoiDungSelector,
} from "../../stores/quanLyNguoiDung";
import { useAppDispatch } from "../../stores";
import { PATH } from "../../constants";

type Props = {
  value?: any | undefined;
};
export const FormUserTemplate = (props: Props) => {
  const { Option } = Select;
  const addUserMutation = useAddUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const { value } = props;
  const { isEditUser } = useQuanLyNguoiDungSelector();

  const dispatch = useAppDispatch();

  // Lấy đường dẫn hiện tại của trang
  const location = useLocation();
  // Nếu nó đang ở trang add user thì setIsEditUser về false
  // isEditUser : false => không thể truy cập vào trang edit, khi nào bấm vào nút edit mới vào được
  if (location.pathname == PATH.addUser) {
    dispatch(userActions.setIsEditUser(false));
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputUserSchemaType>({
    mode: "onChange",
    resolver: zodResolver(InputUserSchema),
  });
  useEffect(() => {
    if (value) {
      setValue("name", value.name);
      setValue("email", value.email);
      setValue("phone", value.phone);
      setValue("birthday", value.birthday);
      setValue("gender", value.gender);
      setValue("role", value.role);
      setValue("id", value.id);
    }
  }, [value, setValue]);

  const resetInputField = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("birthday", "");
    setValue("gender", true);
    setValue("role", "USER");
    setValue("password", "");
    setValue("id", 0);
  };
  // Hàm xử lý khi submit form thành công
  const onSubmit = (data: InputUserSchemaType) => {
    // Nếu đang xử lý thêm user
    if (!isEditUser) {
      addUserMutation.mutate(data);
      resetInputField();
    }
    // Nếu là cập nhật user
    if (isEditUser) {
      // Validate với schema cập nhật
      updateUserMutation.mutate(data);
    }
  };

  return (
    <div className="my-[20px] container mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12">
          <div className="col-span-6 ">
            <div className="me-[30px]">
              <p>
                Họ tên <span className="text-red-600"> *</span>
              </p>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Nhập họ tên"
                    className="mb-[20px]"
                    status={errors.name && "error"}
                    {...field}
                  />
                )}
              />
              <p>
                Email <span className="text-red-600"> *</span>
              </p>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    className="mb-[20px]"
                    status={errors.email && "error"}
                    {...field}
                  />
                )}
              />
              {!isEditUser ? (
                <>
                  <p>
                    Mật khẩu <span className="text-red-600"> *</span>
                  </p>
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="mb-[20px]"
                        status={errors.password && "error"}
                        {...field}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <p>ID</p>
                  <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                      <Input
                        disabled
                        className="mb-[20px]"
                        status={errors.id && "error"}
                        {...field}
                      />
                    )}
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-span-6">
            <div className="me-30">
              <div>
                <p>
                  Số điện thoại <span className="text-red-600"> *</span>
                </p>
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="mb-[20px]"
                      status={errors.phone && "error"}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-12 ">
                <div className="col-span-7">
                  <p>
                    Giới tính <span className="text-red-600"> *</span>
                  </p>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="mb-[20px]"
                        {...field}
                        placeholder="Chọn giới tính"
                        style={{ width: 150 }}
                        onChange={(value) => {
                          field.onChange(value); // Đảm bảo cập nhật giá trị vào react-hook-form
                          console.log("value: ", value);
                        }}
                        defaultValue={true}
                      >
                        <Option value={true}>Nam</Option>
                        <Option value={false}>Nữ</Option>
                      </Select>
                    )}
                  />
                  <p>
                    Role <span className="text-red-600"> *</span>
                  </p>
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Chọn role"
                        style={{ width: 150 }}
                        status={errors.role ? "error" : undefined} // Hiển thị lỗi nếu có
                        onChange={(value) => {
                          field.onChange(value); // Đảm bảo cập nhật giá trị vào react-hook-form
                          console.log("value: ", value);
                        }}
                        defaultValue={"USER"}
                      >
                        <Option value="ADMIN">ADMIN</Option>
                        <Option value="USER">USER</Option>
                      </Select>
                    )}
                  />
                </div>
                <div className="col-span-5">
                  <p>
                    Ngày sinh <span className="text-red-600"> *</span>
                  </p>
                  {errors.birthday && (
                    <p className="text-red-500">{errors.birthday.message}</p>
                  )}
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="mb-[20px]"
                        {...field}
                        status={errors.birthday && "error"} // Hiển thị lỗi nếu có
                        placeholder="dd/mm/yyyy"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isEditUser ? (
          <Button className="bg-green-500 text-white" htmlType="submit">
            Thêm người dùng
          </Button>
        ) : (
          <Button className="bg-green-500 text-white" htmlType="submit">
            Cập nhật
          </Button>
        )}
      </form>
    </div>
  );
};
