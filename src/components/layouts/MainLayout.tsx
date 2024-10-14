import { Outlet } from "react-router-dom";
import { Navbar } from "../ui";
import Footer from "../ui/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
