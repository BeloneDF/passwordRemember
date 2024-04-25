import { PasswordSchema, type Password } from "../../types/passwords";
import { prisma } from "./../../db/prisma";

export async function addPassword(data: Password) {
  const result = PasswordSchema.safeParse(data);

  if (!result) {
    return new Response("erro ao inserir a senha", {
      status: 205,
    });
  }

  try {
    await prisma.passwords.create({ data });
    return new Response("Senha adicionada com sucesso!", {
      status: 200,
    });
  } catch (error) {
    return new Response(`Erro ao inserir a senha, ${error}`, {
      status: 405,
    });
  }
}

export async function GetPasswords() {
  try {
    const data = await prisma.passwords.findMany();
    return Response.json({ data: data });
  } catch (error) {
    return new Response("Erro ao buscar senhas", {
      status: 405,
    });
  }
}
