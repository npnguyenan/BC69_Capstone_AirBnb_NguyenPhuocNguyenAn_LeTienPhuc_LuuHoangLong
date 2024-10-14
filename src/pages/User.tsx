import { UserListTemplate } from "../components/templates/UserListTemplate";

export const User = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center my-10 text-40 font-500">Quản lý người dùng</h1>
      <UserListTemplate />
    </div>
  );
};
