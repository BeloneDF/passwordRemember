import { Elysia } from "elysia";
import * as Controller from "../controllers/user/user";
import { type User } from "../types/user";
import { jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
export const UserRoutes = (app: Elysia) => {
  app.post("/user", ({ body }: { body: User }) => {
    try {
      console.log(body);
      return Controller.AddUser(body);
    } catch (error) {
      console.error(error);
    }
  });
  app.post("/login", ({ body }: { body: User }) => {
    try {
      return Controller.Login(body);
    } catch (error) {
      console.error(error);
    }
  });
};
