import { HomeTemplate } from "./HomeTemplate";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      {/* <Outlet />  */}
      <HomeTemplate />
    </div>
  );
};

export default Main;
