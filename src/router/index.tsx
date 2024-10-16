import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { DetailRoom, Home, User, UserManage } from "../pages";
import {
  FormEditUserTemplate,
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
