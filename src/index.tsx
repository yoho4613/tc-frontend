import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import "./API/emailjsAPI.ts";
import { TheCapsuleProvider } from "./context/TheCapsuleContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_BASE_URL!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin + "/board",
      }}
    >
      <TheCapsuleProvider>
        <App />
      </TheCapsuleProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
