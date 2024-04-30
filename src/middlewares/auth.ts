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

  if (!user) {
    return new Response("Credenciais Invállidas");
  }

  const validPassword = await Bun.password.verify(
    body.password,
    user.password,
    "argon2id"
  );
  if (!validPassword) {
    return new Response("Credenciais Invállidas");
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
