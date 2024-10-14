import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import Main from "../components/Main";
import { Comment, DetailRoom, Home, User } from "../pages";
import { MainLayout } from "../components";
import {
  FormEditUserTemplate,
  FormUserTemplate,
} from "../components/templates";

export const routers = () =>
  useRoutes([
    {
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
        {
          path: PATH.user,
          element: <User />,
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
