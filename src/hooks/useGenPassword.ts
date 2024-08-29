import { useState, useEffect } from "react";
import { genPassword } from "@/actions/genPassword";

export function useGenPassword({
  caracter,
  passwordTypes,
}: {
  caracter: number;
  passwordTypes: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  };
}) {
  const [password, setPassword] = useState({
    password: "",
    percent: 0,
  });

  const generate = () => {
    const newPassword = genPassword({ caracter, passwordTypes });
    setPassword({
      password: newPassword.password,
      percent: newPassword.percent,
    });
  };

  useEffect(() => {
    generate();
  }, [caracter, passwordTypes]);

  return { password, generate };
}
