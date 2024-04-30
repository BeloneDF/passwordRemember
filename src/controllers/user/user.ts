import { env } from "../../env";
import CustomError from "../../hooks/error";
import { UserSchema, type User } from "../../types/user";
import { prisma } from "./../../db/prisma";
import { jwt } from "@elysiajs/jwt";

export async function GetUser() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ data: users });
  } catch (e) {
    return CustomError(`Erro ao buscar usuários: ${e} `);
  }
}

export async function GetUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });
    return Response.json({ user });
  } catch (error) {
    return CustomError(`Erro ao buscar usuários: ${error} `);
  }
}

export async function DeleteUser(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    await prisma.user.delete({ where: { id } });
    return new Response(`Usuário ${user?.username} deletado com sucesso`, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Erro ao excluir: ${error}`, {
      status: 400,
    });
  }
}

export async function PutUser({ id, body }: { id: string; body: User }) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  try {
    if (user && user.email && user.email.length > 1) {
      await prisma.user.update({ where: { id }, data: body });
      return new Response("Usuário atualizado com sucesso!", {
        status: 200,
      });
    } else {
      return new Response("usuario nao existe para atualizar");
    }
  } catch (error) {
    return new Response("Erro ao atualizar usuario");
  }
}

export async function AddUser(data: User) {
  const result = UserSchema.safeParse({ data });
  const { password, email, ...userData } = data; // Extrai a senha do objeto data

  const hashedPassword: string = await Bun.password.hash(
    data.password,
    "argon2id"
  );

  const hasAccount = await prisma.user.findFirst({ where: { email } });

  if (!result.success) {
    CustomError("Erro ao adicionar usuário!");
  } else {
    try {
      if (hasAccount && hasAccount.email && hasAccount.email.length > 1) {
        return new Response("usuário ja existe", {
          status: 400,
        });
      } else {
        await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            email: email,
          },
        });
        return {
          message: "Usuário adicionado com sucesso!",
          code: 200,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Erro ao adicionar usuário!",
        code: 500,
      };
    }
  }
}
