import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { InputUserSchema, InputUserSchemaType } from "../../schemas";
import { useUpdateInfoMutation } from "../../hooks/api";
import { useEffect } from "react";
import {
  userActions,
  useQuanLyNguoiDungSelector,
} from "../../stores/quanLyNguoiDung";
import { useAppDispatch } from "../../stores";
import { User } from "../../@types";
import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";

type Props = {
  userInfo: User | undefined;
};
export const EditInfoTemplate = (props: Props) => {
  const { userInfo } = props;
  const dispatch = useAppDispatch();
  const { editInfo } = useQuanLyNguoiDungSelector();
  const { Option } = Select;
  const updateInfoMutation = useUpdateInfoMutation();
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
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("email", userInfo.email);
      setValue("phone", userInfo.phone);
      setValue("birthday", userInfo.birthday);
      setValue("gender", userInfo.gender);
      setValue("id", userInfo.id);
    }
  }, [userInfo, setValue]);

  let { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ["InfoUser", userInfo?.id],
    queryFn: async () => {
      if (userInfo?.id) {
        return nguoiDungServices.getUserById(`${userInfo?.id}`);
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
  });
  const user = userData?.data.content;
  refetchUser();
  // Hàm xử lý khi submit form thành công
  const onSubmit = (data: InputUserSchemaType) => {
    updateInfoMutation.mutate(data);
    refetchUser();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-[17px] my-[20px] flex justify-evenly">
        <div className="grid grid-cols-5  md:grid-cols-3 ">
          <div className="col-span-1 font-medium">
            <p className="my-[40px] md:my-[30px]">ID user : </p>
            <p className="my-[40px] md:my-[30px]">Họ tên : </p>
            <p className="my-[40px] md:my-[30px]">Ngày sinh :</p>
          </div>
          {editInfo ? (
            <div className="col-span-4 md:col-span-2 font-400 ps-[10px] md:ps-0 ">
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled
                    className="mt-[40px] md:mt-[30px] w-2/3 md:w-2/3"
                    status={errors.id && "error"}
                    {...field}
                  />
                )}
              />
              <br />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    className="mt-[30px] w-2/3  md:mt-[20px]"
                    status={errors.name && "error"}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="DD/MM/YYYY"
                    className="mt-[30px] w-2/3 md:mt-[20px]"
                    status={errors.birthday && "error"}
                    {...field}
                  />
                )}
              />
              {errors.birthday && (
                <p className="text-red-500">{errors.birthday.message}</p>
              )}
            </div>
          ) : (
            <div className="col-span-4 font-400 ps-1 md:col-span-2">
              <p className=" my-[40px] md:my-[30px]">{user?.id}</p>
              <p className=" my-[40px] md:my-[30px]">{user?.name}</p>
              <p className=" my-[40px] md:my-[30px]">{user?.birthday}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 md:grid-cols-3">
          <div className="col-span-1 font-medium">
            <p className="my-[40px] md:my-[30px] font-500">Email :</p>
            <p className="my-[40px] md:my-[30px] font-500">Số điện thoại :</p>
            <p className="my-[40px] md:my-[30px] font-500">Giới tính : </p>
          </div>
          {editInfo ? (
            <div className="col-span-4 md:col-span-2 font-400 ps-[10px] md:ps-0 ">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    className="mt-[40px] md:mt-[30px] w-2/3"
                    status={errors.email && "error"}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    className="mt-[30px] w-2/3 md:mt-[20px]"
                    status={errors.phone && "error"}
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
              <br />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    className="mt-[30px] md:mt-[20px]"
                    {...field}
                    placeholder="Chọn giới tính"
                    style={{ width: 150 }}
                    onChange={(value) => {
                      field.onChange(value); // Đảm bảo cập nhật giá trị vào react-hook-form
                      console.log("value: ", value);
                    }}
                  >
                    <Option value={true}>Nam</Option>
                    <Option value={false}>Nữ</Option>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
          ) : (
            <div className="col-span-4 font-normal ps-[10px] md:col-span-2">
              <p className=" my-[40px] md:my-[30px]">{user?.email}</p>
              <p className=" my-[40px] md:my-[30px]">{user?.phone}</p>
              <p className=" my-[40px] md:my-[30px]">
                {user?.gender ? "Nam" : "Nữ"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        {editInfo ? (
          <>
            <Button
              htmlType="submit"
              onClick={() => {
                //   dispatch(userActions.setEditInfo(false));
              }}
            >
              Cập nhật hồ sơ
            </Button>
            <Button
              className="bg-red-500 mx-[10px] text-white"
              onClick={() => {
                dispatch(userActions.setEditInfo(false));
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          <p
            className="cursor-pointer hover:text-blue-500 font-500"
            onClick={() => {
              dispatch(userActions.setEditInfo(true));
            }}
          >
            <i className="fa-solid fa-gear"></i> Chỉnh sửa hồ sơ
          </p>
        )}
      </div>
    </form>
  );
};
