"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import { selectMethod } from "@/api/methods";
import { parseCookies } from "nookies";
import { User } from "@/types/user";

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<
  | {
      user: User | null;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
    }
  | undefined
>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = parseCookies();
  const token = cookies.access_token;

  useEffect(() => {
    if (!token) {
      console.error("No access token found in cookies");
      return;
    }

    const decode = decodeToken(token);

    async function getUser() {
      try {
        const response = await selectMethod("get", `users/${decode.sub}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error); // Debugging
      }
    }

    getUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
