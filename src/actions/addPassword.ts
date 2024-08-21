// No arquivo onde você usa addPassword
import { toBase64 } from "@/functions/toBase64";
import { Passwords } from "@/types/passwords";

export async function addPassword(data: Passwords) {
  console.log(data);

  // const file = data.get("image") as File | null;
  // const password = data.get("password"); // Acessando a propriedade password corretamente

  // if (file && file.size > 0 && file.type !== "application/octet-stream") {
  //   console.log("Arquivo válido:", file.name);
  //   try {
  //     const base64 = await toBase64(file);
  //     console.log(base64);
  //   } catch (error) {
  //     console.error("Erro ao converter para Base64:", error);
  //   }
  // } else {
  //   console.log("Arquivo inválido ou não fornecido.");
  // }

  // // Se necessário, faça algo com password aqui
  // if (password) {
  //   console.log("Password:", password);
  // }
}
