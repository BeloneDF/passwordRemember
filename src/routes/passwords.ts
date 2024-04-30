import Elysia from "elysia";
import * as Controller from "../controllers/passwords/password";
import { type Password } from "../types/passwords";

export const PasswordRoutes = (app: Elysia) => {
  app.post("/password", ({ body }: { body: Password }) => {
    return Controller.addPassword(body);
  });
  app.get("/passwords", () => {
    return Controller.GetPasswords();
  });

  app.get("/passwordsByUser/:id", ({ params }: { params: { id: string } }) => {
    try {
      return Controller.GetPasswordsByUserId(params.id);
    } catch (error) {
      console.log(error);
    }
  });
};
