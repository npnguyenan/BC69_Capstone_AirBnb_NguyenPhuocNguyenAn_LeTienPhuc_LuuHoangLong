import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import Main from "../components/Main";
import { Comment, DetailRoom, Home, User } from "../pages";

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
        },
      ],
    },
    {
      path: PATH.comment,
      element: <Comment />,
    },
  ]);
