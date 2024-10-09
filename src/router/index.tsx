import { useRoutes } from "react-router-dom";
import { Home } from "../pages";
import { MainLayout } from "../component";

export const routers = () =>
  useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
