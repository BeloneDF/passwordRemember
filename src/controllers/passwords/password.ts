import { PasswordSchema, type Password } from "../../types/passwords";
import { prisma } from "./../../db/prisma";
import { env } from "../../env";
import * as jwt from "jsonwebtoken";

export async function addPassword(data: Password) {
  const result = PasswordSchema.safeParse(data);
  if (!result) {
    return new Response("erro ao inserir a senha", {
      status: 205,
    });
  }

  const passwordEncoded = btoa(data.password);
  const loginEncoded = btoa(data.login);
  data.password = passwordEncoded;
  data.login = loginEncoded;

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

export async function GetPasswordsByUserId(id: string) {
  try {
    const data = await prisma.passwords.findMany({
      where: {
        userId: id,
      },
    });
    const token = jwt.sign(
      {
        data: data.map((item) => ({
          ...item,
          password: item.password ? atob(item.password) : "",
          login: item.login ? atob(item.login) : "",
        })),
      },
      env.JWT_SECRETS_PASSWORD
    );
    return Response.json({ token });
  } catch (error) {
    console.error(error);
  }
}

export async function DeletePassword(id: string) {
  console.log(id);
  try {
    await prisma.passwords.delete({ where: { id } });
    return new Response("Senha deletada com sucesso!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao deletar senha", {
      status: 405,
    });
  }
}
