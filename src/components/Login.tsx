import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

export default function Login() {
  const auth = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth?.user) {
      router.push("/");
    }
  }, [auth?.user, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await auth?.login(username, password);

      if (response) {
        router.push("/");
      } else {
        setError("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
