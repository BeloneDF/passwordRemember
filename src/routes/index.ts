import { Elysia } from "elysia";
import { PasswordRoutes } from "./passwords";
import { PrivateUser, NormalUser } from "./user";

export const Routes = () => {
  const app = new Elysia();
  PrivateUser(app);
  PasswordRoutes(app);
  return app;
};

export const NormalRoutes = () => {
  const app = new Elysia();
  NormalUser(app);
  return app;
};
