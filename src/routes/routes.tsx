import { createBrowserRouter } from "react-router-dom";
import App from "../pages/login/login";
//import Home from "../pages/home/home";
import AuthRoute from "./authRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
  },
  {
    path: "/Home",
    element: (
      <>
        <AuthRoute />
      </>
    ),
  },
]);

export default router;
