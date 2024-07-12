import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./CustomAlert.css"; // Importa o CSS para as animações

type CustomAlertProps = {
  message: string;
  variant: "success" | "danger";
  duration?: number;
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  variant,
  duration = 2000,
}) => {
  const [show, setShow] = useState(true);
  const [animationClass, setAnimationClass] = useState("fade-in");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("fade-out");
    }, duration - 500); // Inicia o fade out um pouco antes do alerta desaparecer

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (animationClass === "fade-out") {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500); // Espera o fade out terminar para remover o alerta

      return () => clearTimeout(timer);
    }
  }, [animationClass]);

  if (!show) return null;

  return (
    <Alert
      key={variant}
      variant={variant}
      className={animationClass} // Aplica a classe de animação
      style={{
        zIndex: 9999,
        position: "fixed",
        right: 0,
        bottom: 0,
        margin: "1rem",
      }}
    >
      {message}
    </Alert>
  );
};

export default CustomAlert;
