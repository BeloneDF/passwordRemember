import CustomError from '../../hooks/error';
import { UserSchema, type User } from '../../types/user';
import { prisma } from './../../db/prisma';

export async function GetUser() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ data: users });
  } catch (e) {
    return CustomError(`Erro ao buscar usuários: ${e} `);
  }
}

export async function AddUser(data: User) {
  const result = UserSchema.safeParse({ data });

  const { password, ...userData } = data; // Extrai a senha do objeto data
  const hashedPassword: string = await Bun.password.hash(
    data.password,
    'bcrypt',
  );

  if (!result.success) {
    CustomError('Erro ao adicionar usuário!');
  } else {
    try {
      await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      return {
        message: 'Usuário adicionado com sucesso!',
        code: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Erro ao adicionar usuário!',
        code: 500,
      };
    }
  }
}

export async function Login(body: User) {
  const { email, password } = body;

  if (!email || typeof email !== 'string') {
    return new Response('Invalid email', {
      status: 400,
    });
  }
  if (!password || typeof password !== 'string') {
    return new Response('invalid password', {
      status: 400,
    });
  }
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return new Response('Invalid email or password', {
      status: 400,
    });
  }

  const validPassword = await Bun.password.verify(
    body.password,
    user.password,
    'bcrypt',
  );

  if (!validPassword) {
    return new Response('Invalid email or password', {
      status: 400,
    });
  }

  return Response.json({
    message: 'Logou com sucesso!',
    status: 200,
  });
}
