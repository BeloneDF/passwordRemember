import { ReactNode, createContext, useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import { selectMethod } from "../api/methods";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  photo: string;
};

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
  const token = localStorage.getItem("acess_token") as string;
  const decode = decodeToken(token);

  async function getUser() {
    try {
      const response = await selectMethod("get", `users/${decode.sub}`);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
