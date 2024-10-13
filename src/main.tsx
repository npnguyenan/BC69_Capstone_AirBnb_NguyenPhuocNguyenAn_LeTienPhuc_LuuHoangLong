import { createRoot } from "react-dom/client";
import App from "./App.tsx"; // Đảm bảo đường dẫn này chính xác
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { ToastifyProvider } from "./contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./stores/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastifyProvider>
          <App /> {/* Bọc App trong BrowserRouter */}
        </ToastifyProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
