import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
