import { createBrowserRouter } from "react-router-dom";
import App from "../pages/login/login";
//import Home from "../pages/home/home";
import Signup from "../pages/signup/signup";
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
    path: "/Signup",
    element: (
      <>
        <Signup />
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
