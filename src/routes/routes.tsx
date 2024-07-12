import { createBrowserRouter } from "react-router-dom";
import App from "../pages/login/login";
//import Home from "../pages/home/home";
import Signup from "../pages/signup/signup";
import AuthRoute from "./authRoutes";
import HeaderApp from "@components/header/headerApp/headerApp";

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
        <HeaderApp />
        <AuthRoute />
      </>
    ),
  },
]);

export default router;
