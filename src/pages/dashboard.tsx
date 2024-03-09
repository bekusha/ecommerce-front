import React from "react";
import { useAuth } from "@/context/authContext";

const dashboard = () => {
  const auth = useAuth();
  if (auth && auth.user) {
    return (
      <div>
        <p>Welcome, {auth.user.username}</p>
      </div>
    );
  }
};

export default dashboard;
