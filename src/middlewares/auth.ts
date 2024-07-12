import { prisma } from "../db/prisma";
import { env } from "../env";
import type { User } from "../types/user";
import jwt from "jsonwebtoken";

export async function Auth(body: User) {
  if (!body.email || typeof body.email !== "string") {
    return new Response("Invalid email", {
      status: 400,
    });
  }
  if (!body.password || typeof body.password !== "string") {
    return new Response("invalid password", {
      status: 400,
    });
  }

  const user = await prisma.user.findFirst({ where: { email: body.email } });
  if (!user || user == null) {
    return Response.json(
      {
        message: "Credenciais Inválidas",
      },
      { status: 400 }
    );
  }

  const validPassword = await Bun.password.verify(
    body.password,
    user.password,
    "argon2id"
  );
  if (!validPassword) {
    return Response.json(
      {
        message: "Credenciais Inválidas",
      },
      { status: 400 }
    );
  }

  if (!user.verified) {
    return Response.json(
      {
        message: "Conta não verificada",
      },
      { status: 400 }
    );
  }

  const jwtToken = jwt.sign({ sub: String(user.id) }, env.JWT_SECRETS!, {
    expiresIn: "15d",
  });

  return Response.json({
    message: "Logou com sucesso!",
    status: 200,
    acess_token: jwtToken,
  });
}

export async function AuthRouteFront(token: string) {
  if (!token) {
    return Response.json(false);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRETS);
    const user = await prisma.user.findFirst({
      where: { id: decoded.sub as string },
    });
    if (!user) {
      return Response.json(false);
    }

    setTimeout(() => {
      Response.json(user);
    }, 500);
  } catch (error) {
    return Response.json(false);
  }
}
