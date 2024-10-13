import { FormUserTemplate } from "./FormUserTemplate";
import { Button } from "antd";
import { useDeleteUserMutation } from "../../hooks/api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { nguoiDungServices } from "../../services";
import { useQuanLyNguoiDungSelector } from "../../stores/quanLyNguoiDung";
import { Navigate } from "react-router-dom";
import { PATH } from "../../constants";

export const FormEditUserTemplate = () => {
  const { userId, isEditUser } = useQuanLyNguoiDungSelector();

  if (!isEditUser) return <Navigate to={PATH.addUser} />;
  let { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ["NguoiDungById", userId],
    queryFn: async () => {
      if (userId) {
        return nguoiDungServices.getUserById(`${userId}`);
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: !!userId,
  });
  useEffect(() => {
    if (userId) {
      refetchUser(); // Gọi lại API khi userId thay đổi
    }
  }, [userId, refetchUser]);

  return (
    <FormUserTemplate value={userData ? userData?.data.content : undefined} />
  );
};
