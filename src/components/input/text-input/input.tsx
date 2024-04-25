import { InputSchema, SelectSchema } from "../../../schemas/input.ts";
import { InputProps, SelectProps } from "../../../types/input.ts";
import * as S from "./input.styled.ts";

export const TextInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  style,
  type,
  name,
  id,
  className,
  required,
  ref,
}) => {
  const result = InputSchema.safeParse({
    placeholder,
    value,
    onChange,
    style,
    type,
    name,
    id,
    className,
    required,
    ref,
  });

  if (!result.success) {
    console.error(result.error);
    return null;
  }
  return (
    <S.Container>
      <S.TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        type={type}
        name={name}
        id={id}
        className={className}
        required={required}
        autoComplete="off"
        ref={ref}
        
      />
    </S.Container>
  );
};

export const SelectInput: React.FC<SelectProps> = ({
  value,
  style,
  name,
  id,
  className,
  required,
  children,
  onChange,
  label,
}) => {
  const result = SelectSchema.safeParse({
    value,
    style,
    name,
    id,
    className,
    required,
    onChange,
    label,
  });
  if (!result.success) {
    console.error(result.error);
    return null;
  }
  return (
    <S.Container>
      <label> {label}</label>
      <S.SelectInput
        value={value}
        style={style}
        name={name}
        id={id}
        className={className}
        required={required}
        onChange={onChange}
      >
        {children}
      </S.SelectInput>
    </S.Container>
  );
};
