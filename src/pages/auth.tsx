// pages/auth.tsx
import React, { useState } from "react";
import Login from "@/components/Login"; // Assume this is your login component
import Register from "@/components/register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? <Login /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Need an account? Register"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}
