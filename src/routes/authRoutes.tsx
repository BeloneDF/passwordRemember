import axios from "axios";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { globalAuthAtom } from "../atom/auth";
import Loading from "../components/loading/loading";
import { Navigate } from "react-router-dom";
import Home from "../pages/home/home";
// interface Props {
//   children: string | JSX.Element | JSX.Element[];
// }

function AuthRoute() {
  const acess_token = localStorage.getItem("acess_token");
  const [loading, setLoading] = useState(true);

  const [globalAuth] = useAtom(globalAuthAtom);

  async function getData() {
    try {
      const response = await axios.get(`/auth/${acess_token}`, {
        headers: {
          Authorization: "Bearer " + acess_token,
        },
      });
      if (!response.data) {
        localStorage.removeItem("acess_token");
        window.location.href = "/login";
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (globalAuth) {
      return;
    }
    if (!globalAuth && acess_token) {
      getData();
      return;
    }
  }, [globalAuth]);

  return (
    <>
      {!!localStorage.getItem("acess_token") && loading ? (
        <Loading />
      ) : (
        <>
          {localStorage.getItem("acess_token") ? (
            // console.log(localStorage.getItem("acess_token"))
            <Home />
          ) : (
            <Navigate to="/" />
          )}
        </>
      )}
    </>
  );
}

export default AuthRoute;
