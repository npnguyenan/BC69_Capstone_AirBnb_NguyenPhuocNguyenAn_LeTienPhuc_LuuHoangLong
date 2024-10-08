import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/index.ts";
import { ToastifyProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastifyProvider>
        <App />
      </ToastifyProvider>
    </Provider>
  </BrowserRouter>
);
