import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { Comment, DetailRoom, Home, User } from "../pages";
import { FormUserTemplate } from "../components/templates/FormUserTemplate";
import { FormEditUserTemplate } from "../components/templates/FormEditUserTemplate";
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
          element: <User />,
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
          element: <Comment />,
          path: PATH.comment,
        },
        {
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
      ],
    },
  ]);
