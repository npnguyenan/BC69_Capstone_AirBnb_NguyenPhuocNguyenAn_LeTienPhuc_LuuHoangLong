import { Outlet } from "react-router-dom";
import { Footer, Header } from "../ui";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 mt-[40px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
