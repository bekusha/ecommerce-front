import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { User } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      try {
        const userDetailsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}user/detail/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setUser(userDetailsResponse.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        localStorage.removeItem("access");
      }
    }
    setLoading(false);
  };
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}user/api/token/`,
        { username, password }
      );
      localStorage.setItem("access", loginResponse.data.access);

      const userDetailsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}user/detail/`,
        {
          headers: { Authorization: `Bearer ${loginResponse.data.access}` },
        }
      );

      setUser(userDetailsResponse.data);
      setLoading(false);
      return true; // Login was successful
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false; // Login failed
    }
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("access");
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
