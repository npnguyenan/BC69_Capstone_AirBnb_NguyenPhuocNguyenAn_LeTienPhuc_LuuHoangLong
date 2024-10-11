import { useRoutes } from "react-router-dom";
import { DetailRoom, Home } from "../pages";
import { MainLayout } from "../component";
import { PATH } from "../constants";

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
          path: PATH.DetailRoom,
          element: <DetailRoom />,
        },
      ],
    },
  ]);
