import { Outlet } from "react-router-dom";
import { RoomListTemplate } from "../components";

export const RoomManage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center my-4 text-[30px] font-bold">
        Quản lý phòng thuê
      </h1>
      <Outlet />
      <RoomListTemplate />
    </div>
  );
};
