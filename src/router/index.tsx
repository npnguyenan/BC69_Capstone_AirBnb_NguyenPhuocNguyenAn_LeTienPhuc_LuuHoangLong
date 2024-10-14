import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import MainTemplate from "../components/layouts/MainLayout";
import { Comment, DetailRoom, Home } from "../pages";

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
