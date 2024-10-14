import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import MainTemplate from "../components/templates/MainTemplate";
import { Comment, DetailRoom, Home, User } from "../pages";

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
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
        {
          path: PATH.user,
          element: <User />,
          children: [],
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
