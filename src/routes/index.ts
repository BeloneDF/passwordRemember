import { Elysia } from 'elysia';
import { PasswordRoutes } from './passwords';
import { UserRoutes } from './user';

export const Routes = () => {
  const app = new Elysia();
  UserRoutes(app);
  PasswordRoutes(app);
  return app;
};
