import { HomeTemplate } from "../templates/HomeTemplate";
import { NavbarTemplate } from "../templates/NavbarTemplate";
import Footer from "../ui/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavbarTemplate />
      <HomeTemplate />
      <Footer />
    </div>
  );
};

export default MainLayout;
