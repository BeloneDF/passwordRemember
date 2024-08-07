import { useState } from "react";
import CardLogin from "../../components/cardLogin";
import { TextInput } from "../../components/input/text-input/input.tsx";
import { LargeButton } from "../../components/largeButton/largeButton.styled.ts";
import CustomAlert from "@components/alert/alert";
import { selectMethod } from "../../api/methods";
import Loading from "@components/loading/loading.tsx";

interface User {
  username: string;
  email: string;
  password: string;
}

function App() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      const response = await selectMethod("post", "/login", {
        email: user.email,
        password: user.password,
      });
      setAlertMessage("correct");
      setLoading(true);
      localStorage.setItem("acess_token", response.data.acess_token);
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } catch (error) {
      setAlertMessage("error");
      console.error(error);
    }
  }

  return (
    <CardLogin title="Login ou Registre-se">
      <TextInput
        data-bs-theme="dark"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        id="username"
        label="Username"
      />
      <TextInput
        data-bs-theme="dark"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        id="password"
        label="Password"
      />
      <br />
      {loading ? (
        <Loading />
      ) : (
        <LargeButton onClick={() => login()}>Login</LargeButton>
      )}

      <span style={{ fontSize: 12, fontWeight: "bold" }}>
        Não possui conta? <a href="/Signup">Cadastre-se</a>
      </span>
      {alertMessage === "" ? null : alertMessage === "correct" ? (
        <CustomAlert message={"Autenticado com sucesso!"} variant="success" />
      ) : (
        <CustomAlert message={"Credenciais Inválidas"} variant="danger" />
      )}
    </CardLogin>
  );
}

export default App;
