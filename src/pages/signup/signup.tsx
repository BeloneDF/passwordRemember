import React, { useRef, useState } from "react";
import CardLogin from "@components/cardLogin";
import { TextInput } from "@components/input/text-input/input";
import { LargeButtonComponent } from "@components/largeButton/largeButton";
import { selectMethod } from "../../api/methods";
import Loading from "@components/loading/loading";

function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await selectMethod("post", "/user", {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      setLoading(false);
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <CardLogin title="Registre-se">
      <TextInput
        type="text"
        placeholder="Username"
        label="Username"
        required
        id="username"
        ref={usernameRef}
      />
      <TextInput
        type="email"
        placeholder="Email"
        label="Email"
        required
        id="email"
        ref={emailRef}
      />
      <TextInput
        type="password"
        placeholder="Password"
        label="Password"
        required
        id="password"
        ref={passwordRef}
      />
      {loading ? (
        <Loading />
      ) : (
        <LargeButtonComponent id="btnenviar" onClick={handleSubmit}>
          Cadastrar
        </LargeButtonComponent>
      )}
    </CardLogin>
  );
}

export default Signup;
