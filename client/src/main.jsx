import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./Store/ConfigureStore.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import Modal from "react-modal";
import { AuthProvider } from "./authProvider.jsx";
Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </Provider>
);
