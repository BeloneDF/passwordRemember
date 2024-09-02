import { useState } from "react";

export function useSlider() {
  const [caracter, setCaracter] = useState(8);

  const handleChange = (event: any) => {
    setCaracter(event.target.value);
  };

  return { caracter, handleChange, setCaracter };
}
