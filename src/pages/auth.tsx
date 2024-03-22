// pages/auth.tsx
import React, { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div>
        {isLogin ? <Login /> : <Register />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className=" text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out text-sm">
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
