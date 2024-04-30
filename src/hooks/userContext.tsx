import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
}

interface UserProviderProps {
  children: ReactNode;
}

function decodeToken(token: string) {
  try {
    if (token !== "") {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
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
    console.log(decode.sub);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${decode.sub}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUser(response.data.user); // Define o usuário diretamente, sem encapsulá-lo em um array
    } catch (error) {
      console.log(error);
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

export { UserProvider, UserContext };
