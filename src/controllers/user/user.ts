import { verify } from "jsonwebtoken";
import CustomError from "../../hooks/error";
import { UserSchema, type User } from "../../types/user";
import { VerifyEmail } from "../verify/verify";
import { prisma } from "./../../db/prisma";

export async function GetUser() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ data: users });
  } catch (e) {
    return CustomError(`Erro ao buscar usuários: ${e} `);
  }
}

export async function VerifyUser(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (user) {
      await prisma.user.update({ where: { id }, data: { verified: true } });
      return Response.json({ message: "Usuário verificado com sucesso!" });
    } else {
      return Response.json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    return CustomError(`Erro ao verificar usuário: ${error} `);
  }
}

export async function GetUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (user) {
      const { verified, password, ...userWithoutVerify } = user;
      return Response.json({ user: userWithoutVerify });
    } else {
      return Response.json({ message: "Usuário não encontrado!" });
    }
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
  const { password, email, ...userData } = body;

  const hashedPassword: string = await Bun.password.hash(
    body.password,
    "argon2id"
  );

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  try {
    if (user && user.email && user.email.length > 1) {
      await prisma.user.update({
        where: { id },
        data: {
          ...userData,
          password: hashedPassword,
          email: email,
        },
      });
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
  console.log(data);
  const hashedPassword: string = await Bun.password.hash(
    data.password,
    "argon2id"
  );

  const hasAccount = await prisma.user.findFirst({ where: { email } });

  if (!result.success) {
    throw CustomError("Erro ao adicionar usuário!");
  } else {
    try {
      if (hasAccount && hasAccount.email && hasAccount.email.length > 1) {
        return new Response("usuário ja existe", {
          status: 400,
        });
      } else {
        const newUser = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            email: email,
            verified: false,
          },
        });
        VerifyEmail({ id: newUser.id, email: newUser.email });
        return {
          message: `Cadastro Realizado com sucesso!`,
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
