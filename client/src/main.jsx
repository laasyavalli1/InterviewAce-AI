import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="262003875798-snn0csvjf3nq95n8uohot76npm5qvped.apps.googleusercontent.com"
    >

      <AuthProvider>

        <App />

      </AuthProvider>

    </GoogleOAuthProvider>

  </React.StrictMode>

);