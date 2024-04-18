import { ButtonProps } from "../../types/largeButton";
import { ButtonSchema } from "../../schemas/largeButton";
import { LargeButton } from "./largeButton.styled";

export const LargeButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  id,
  className,
  style,
}) => {
  const result = ButtonSchema.safeParse({
    children,
    onClick,
    id,
    className,
    style,
  });
  if (!result.success) {
    console.error(result.error);
    return null;
  }
  return (
    <LargeButton onClick={onClick} id={id} className={className} style={style}>
      {children}
    </LargeButton>
  );
};
