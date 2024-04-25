import { createBrowserRouter } from "react-router-dom";
import App from "../pages/login/login";
import Home from "../pages/home/home";

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
        <Home />
      </>
    ),
  },
]);

export default router;