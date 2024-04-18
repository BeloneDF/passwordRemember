import { Elysia } from "elysia";
import * as Controller from "../controllers/user/user";
import { type User } from "../types/user";
import CustomError from "../functions/error";

export const UserRoutes = (app: Elysia) => {
  app.post("/user", ({ body }: { body: User }) => {
    try {
      console.log(body);
      return Controller.AddUser(body);
    } catch (error) {
      console.error(error);
      throw CustomError("Erro ao adicionar o Usuário");
    }
  });
};
