import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithPopup, user } = useAuth0();

  return (
    <button
      className="px-4 py-2 font-bold text-sm"
      onClick={() => loginWithPopup()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
