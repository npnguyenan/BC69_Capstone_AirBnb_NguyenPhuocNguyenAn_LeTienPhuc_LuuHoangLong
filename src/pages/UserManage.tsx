import { Navigate } from "react-router-dom";
import { UserListTemplate } from "../components/templates";
import { useQuanLyNguoiDungSelector } from "../stores/quanLyNguoiDung";
import { PATH } from "../constants";

export const UserManage = () => {
  const { user } = useQuanLyNguoiDungSelector();

  if (user?.user?.role != "ADMIN") {
    return <Navigate to={PATH.info} />;
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-center my-10 text-40 font-500">Quản lý người dùng</h1>
      <UserListTemplate />
    </div>
  );
};
