import { Elysia } from "elysia";
import { Auth, AuthRouteFront } from "../../middlewares/auth";
import { type User } from "../../types/user";

export const AuthRoutes = (): Promise<{ default: Elysia }> => {
  return new Promise((resolve, reject) => {
    try {
      const app = new Elysia();

      app.post("/login", ({ body }: { body: User }) => {
        try {
          return Auth(body);
        } catch (error) {
          console.error(error);
        }
      });

      app.get(
        "/auth/:acess_token",
        ({ params }: { params: { acess_token: string } }) => {
          try {
            return AuthRouteFront(params.acess_token);
          } catch (error) {
            console.error(error);
          }
        }
      );

      resolve({ default: app });
    } catch (error) {
      reject(error);
    }
  });
};
