import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/index.css";

export default function App() {
  // Force dark theme on mount
  if (typeof document !== "undefined") {
    document.documentElement.style.backgroundColor = "#0E0E0E";
    document.body.style.backgroundColor = "#0E0E0E";
    document.body.style.color = "#FFFFFF";
  }

  return <RouterProvider router={router} />;
}