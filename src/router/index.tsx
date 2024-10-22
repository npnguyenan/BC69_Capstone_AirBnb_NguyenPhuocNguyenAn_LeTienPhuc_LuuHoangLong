import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { DetailRoom, Home, RoomManage, User, UserManage } from "../pages";
import {
  FormEditRoomTemplate,
  FormEditUserTemplate,
  
  FormRoomTemplate,
  
  FormUserTemplate,
} from "../components/templates";
import MainLayout from "../components/layouts/MainLayout";

export const routers = () =>
  useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <UserManage />,
          path: PATH.user,
          children: [
            {
              element: <FormUserTemplate />,
              path: PATH.addUser,
            },
            {
              element: <FormEditUserTemplate />,
              path: PATH.editUser,
            },
          ],
        },
        {
          element: <RoomManage />,
          path: PATH.roomAdmin,
          children: [
            {
              element: <FormRoomTemplate />,
              path: PATH.addRoom,
            },
            {
              element: <FormEditRoomTemplate />,
              path: PATH.editRoom,
            },
          ],
        },
        {
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
        {
          element: <User />,
          path: PATH.info,
        },
      ],
    },
  ]);
