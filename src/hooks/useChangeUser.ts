import { useState } from "react";
import { User } from "@/types/user";

export function useChangeUser() {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChangeUser = (value: string, field: keyof User) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return {
    changedUser: user,
    handleChangeUser,
  };
}
