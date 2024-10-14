import { Outlet } from "react-router-dom";
import { NavbarTemplate } from "./NavbarTemplate";

const MainTemplate = () => {
  return (
    <div>
      <NavbarTemplate />
      <Outlet />
    </div>
  );
};

export default MainTemplate;
