import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { DetailRoom, Home, User, UserManage } from "../pages";
import {
  FormEditUserTemplate,
  FormUserTemplate,
} from "../components/templates";
import MainTemplate from "../components/templates/MainTemplate";

export const routers = () =>
  useRoutes([
    {
      element: <MainTemplate />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <User />,
          path: PATH.info,
        },
        {
          element: <UserManage />,
          path: PATH.user,
          children: [
            // {
            // element: <UserListTemplate />,
            // children: [
            {
              element: <FormUserTemplate />,
              path: PATH.addUser,
            },
            {
              element: <FormEditUserTemplate />,
              path: PATH.editUser,
            },
            // ],
            // },
          ],
        },

        {
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
      ],
    },
  ]);
