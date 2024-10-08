import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { Comment, User } from "../pages";

export const routers = () =>
  useRoutes([
    {
      element: <User />,
      path: PATH.user,
    },
    {
      element: <Comment />,
      path: PATH.comment,
    },
  ]);
