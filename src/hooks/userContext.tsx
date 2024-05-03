import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import decodeToken from './decodeToken';

interface User {
  id: string;
}

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
  const token = localStorage.getItem('acess_token') as string;
  const decode = decodeToken(token);

  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${decode.sub}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
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

export { UserContext, UserProvider };
