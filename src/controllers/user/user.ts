import { type User, UserSchema } from "../../types/user";
import CustomError from "../../functions/error";
import { prisma } from "./../../db/prisma";

export async function AddUser(data: User) {
  const result = UserSchema.safeParse({ data });
  console.log(data);

  if (!result.success) {
    CustomError("Erro ao adicionar usuário!");
  } else {
    try {
      const createUser = await prisma.user.create({ data });
      return {
        message: "Usuário adicionado com sucesso!",
        code: 200,
        data: createUser,
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Erro ao adicionar usuário!",
        code: 500,
      };
    }
  }
}
