import { Routes, Route } from "react-router-dom";
import Main from "./components/layouts/MainLayout";
import { HomeTemplate } from "./components/templates";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomeTemplate />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
