import { ReactNode } from "react";
import { Passwords } from "../../types/passwords";
import * as S from "./passwordCard.styled";

interface PasswordCardProps {
  pass: Passwords;
  children?: ReactNode;
}

function PasswordCard({ pass }: PasswordCardProps) {
  const maskedPass = pass.password.replace(/./g, "•");

  function copyToClipboard(type: string) {
    if (type === "password") {
      alert("Senha copiada com sucesso!");
      return navigator.clipboard.writeText(pass.password);
    } else {
      alert("Login copiado com sucesso!");
      return navigator.clipboard.writeText(pass.login);
    }
  }

  return (
    <S.Container>
      <S.ContentMaster>
        <S.Image src={`data:image/jpeg;base64,${pass.image}`} />
        <S.InfoContainer>
          <S.PasswordContainer>
            <S.Name>{pass.name}</S.Name>
            <S.LoginDiv>
              {pass.login}
              <S.ButtonCopyPassword
                onClick={() => {
                  copyToClipboard("email");
                }}
              />
            </S.LoginDiv>
          </S.PasswordContainer>
          <S.PasswordContainer>
            {maskedPass}
            <S.ButtonCopyPassword
              onClick={() => {
                copyToClipboard("password");
              }}
            />
          </S.PasswordContainer>
          <S.SecondVerification>
            2FA{" "}
            <S.CircleSecondVerification
              backgroundColor={
                pass.second_verification === true ? "green" : "red"
              }
            />
            <S.ImageSecondVerification
              src={`data:image/jpeg;base64,${pass.image_verification_software}`}
            />
          </S.SecondVerification>
        </S.InfoContainer>
        <S.OtherContainer />
      </S.ContentMaster>
    </S.Container>
  );
}

export default PasswordCard;
