import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { Comment, DetailRoom, Home, User } from "../pages";
import { MainLayout } from "../components/layouts";
import {
  FormEditUserTemplate,
  FormUserTemplate,
} from "../components/templates";

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
      ],
    },
  ]);
