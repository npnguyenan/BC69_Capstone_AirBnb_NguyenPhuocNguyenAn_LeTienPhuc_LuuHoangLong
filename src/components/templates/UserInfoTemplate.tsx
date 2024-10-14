import { Button, Input } from "antd";
import {
  userActions,
  useQuanLyNguoiDungSelector,
} from "../../stores/quanLyNguoiDung";
import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../stores";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateAvatarSchema, UpdateAvatarSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAvatarMutation } from "../../hooks/api";

export const UserInfoTemplate = () => {
  let { user } = useQuanLyNguoiDungSelector();

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const { updateAvatar, avatarPreview } = useQuanLyNguoiDungSelector();
  const dispatch = useAppDispatch();

  let { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ["InfoUser", user?.user?.id],
    queryFn: async () => {
      if (user) {
        return nguoiDungServices.getUserById(`${user?.user?.id}`);
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: !!user?.user?.id,
  });
  useEffect(() => {
    if (user?.user?.avatar) {
      refetchUser(); // Gọi lại API khi userId thay đổi
    }
  }, [user?.user?.avatar, refetchUser]);

  const userInfo = userData?.data.content;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAvatarSchemaType>({
    mode: "onChange",
    resolver: zodResolver(UpdateAvatarSchema),
  });

  const updateAvatarMutation = useUpdateAvatarMutation();

  let onSubmit: SubmitHandler<UpdateAvatarSchemaType> = async (values) => {
    const formFile = new FormData();
    formFile.append("avatar", values.avatar);
    console.log("values.avatar: ", values.avatar);
    // console.log("formFile: ", formFile);

    // if (values.avatar instanceof File) {
    //   formFile.append("avatar", values.avatar);
    // } else {
    //   console.error("Avatar is not a file.");
    //   return;
    // }

    // Kiểm tra file đã thêm
    formFile.forEach((value, key) => {
      console.log(`check ${key}:`, value);
    });

    updateAvatarMutation.mutate(formFile);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-500 text-30 my-20">
        Thông tin tài khoản
      </h1>
      <h2 className="text-20 font-400 text-center my-10">Ảnh đại diện</h2>
      <div className="flex justify-center">
        {updateAvatar ? (
          <div
            className="p-20 my-10 bg-gray-300 inline-block"
            style={{ borderRadius: "50%" }}
          >
            <img
              src={
                avatarPreview
                  ? avatarPreview
                  : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }
              alt=""
              style={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </div>
        ) : (
          <div
            className="p-20 my-10 bg-gray-300 inline-block"
            style={{ borderRadius: "50%" }}
          >
            <img
              src={
                userInfo?.avatar
                  ? userInfo?.avatar
                  : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }
              alt=""
              style={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </div>
        )}
      </div>
      <div
        className="pb-20 flex justify-center items-center"
        style={{
          borderBottom: "1px solid black",
          borderStyle: "dotted",
        }}
      >
        {updateAvatar ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center "
          >
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Input
                  status={errors.avatar && "error"}
                  className="mx-10 w-80 mb-20"
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement;

                    if (target.files && target.files.length > 0) {
                      let file = target.files[0];
                      console.log("file: ", file);

                      const fileURL = URL.createObjectURL(file);
                      dispatch(userActions.setAvatarPreview(fileURL));
                      field.onChange(file);
                    } else {
                      console.error("No file selected.");
                    }
                  }}
                />
              )}
            />
            <div>
              <Button htmlType="submit" className="cursor-pointer mx-10 px-10">
                Cập nhật ảnh đại diện
              </Button>
              <Button
                htmlType="button"
                className="cursor-pointer bg-red-400"
                onClick={() => {
                  dispatch(userActions.setUpdateAvatar(false));
                }}
              >
                Hủy
              </Button>
            </div>
          </form>
        ) : (
          <p
            className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              dispatch(userActions.setUpdateAvatar(true));
              dispatch(userActions.setAvatarPreview(userInfo?.avatar));
            }}
          >
            Cập nhật ảnh đại diện
          </p>
        )}
      </div>

      <div className="flex justify-around text-[17px]">
        <div className="my-20">
          <p className="my-20 font-500">
            ID : <span className="font-400">{userInfo?.id}</span>
          </p>
          <p className="my-20 font-500">
            Họ tên : <span className="font-400">{userInfo?.name}</span>
          </p>
          <p className="my-20 font-500">
            Ngày sinh : <span className="font-400">{userInfo?.birthday}</span>
          </p>
        </div>
        <div className="my-20">
          <p className="my-20 font-500">
            Email : <span className="font-400">{userInfo?.email}</span>
          </p>
          <p className="my-20 font-500">
            Số điện thoại : <span className="font-400">{userInfo?.phone}</span>
          </p>
          <p className="my-20 font-500">
            Giới tính :{" "}
            <span className="font-400">{userInfo?.gender ? "Nam" : "Nữ"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};