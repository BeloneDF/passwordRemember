import { Passwords } from "@/types/passwords";
import { selectMethod } from "@/api/methods";

interface DeletePasswordProps {
  password: Passwords;
}

export async function deletePassword({ password }: DeletePasswordProps) {
  try {
    const response = await selectMethod("delete", `passwords/${password.id}`);
  } catch (error) {
    console.log(error);
  }
}
