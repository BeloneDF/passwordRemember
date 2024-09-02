import { Passwords } from "@/types/passwords";
import { selectMethod } from "@/api/methods";

interface DeletePasswordProps {
  password: Passwords;
}

export async function deletePassword({ password }: DeletePasswordProps) {
  try {
    const response = await selectMethod("delete", `passwords/${password.id}`);
    if (response.status === 200) {
      alert("Senha deletada com sucesso!");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
