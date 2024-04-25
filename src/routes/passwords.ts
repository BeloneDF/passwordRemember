import Elysia from 'elysia';
import * as Controller from '../controllers/passwords/password';
import { type Password } from '../types/passwords';

export const PasswordRoutes = (app: Elysia) => {
  app.post('/password', ({ body }: { body: Password }) => {
    return Controller.addPassword(body);
  });
};
