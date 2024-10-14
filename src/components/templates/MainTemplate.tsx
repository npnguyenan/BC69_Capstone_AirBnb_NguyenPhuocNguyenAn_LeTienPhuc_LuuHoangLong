import { HomeTemplate } from "./HomeTemplate";
import { NavbarTemplate} from "./NavbarTemplate";

const MainTemplate = () => {
  return (
    <div>
      <NavbarTemplate />
      <HomeTemplate />
    </div>
  );
};

export default MainTemplate;
