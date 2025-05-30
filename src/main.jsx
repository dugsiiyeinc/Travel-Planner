import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { TripProvider } from "./context/TripContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TripProvider>
          <RouterProvider router={AppRoutes} />
        </TripProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
