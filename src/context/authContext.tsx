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
  addPaypalAddress: (paypalAddress: string) => Promise<boolean>;
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

  const addPaypalAddress = async (paypalAddress: string) => {
    try {
      const accessToken = localStorage.getItem("access");
      if (accessToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}user/update-paypal-address/`,
          { paypal_address: paypalAddress },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        // Update the user state with the updated PayPal address
        setUser((prevUser) => {
          if (prevUser) {
            return {
              ...prevUser,
              paypal_address: response.data.paypal_address,
            };
          }
          return null;
        });
        return true; // Adding PayPal address was successful
      }
      return false; // No access token found
    } catch (error) {
      console.error("Error adding PayPal address:", error);
      return false; // Adding PayPal address failed
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    addPaypalAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
