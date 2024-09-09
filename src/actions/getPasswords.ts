import { selectMethod } from "@/api/methods";
import { jwtDecode } from "jwt-decode";
import { Passwords } from "@/types/passwords";
import { User } from "@/types/user";

interface MyJwtPayload {
  data: Passwords[];
}

export async function getPasswords({
  setPasswords,
  user,
}: {
  setPasswords: (passwords: Passwords[]) => void;
  user: User | null;
}) {
  try {
    const response = await selectMethod("get", `passwordsByUser/${user?.id}`);
    console.log(jwtDecode<MyJwtPayload>(response.data.token).data);
    return setPasswords(jwtDecode<MyJwtPayload>(response.data.token).data);
  } catch (error) {
    console.error(error);
  }
}
