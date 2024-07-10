import { ReactNode } from "react";
import { Passwords } from "../../types/passwords";
import * as S from "./passwordCard.styled";
import axios from "axios";

interface PasswordCardProps {
  pass: Passwords;
  children?: ReactNode;
}

function PasswordCard({ pass }: PasswordCardProps) {
  const maskedPass = pass.password.replace(/./g, "•");

  async function deletePassword() {
    const token = localStorage.getItem("acess_token");
    try {
      const response = await axios.delete(
        `http://localhost:3001/password/${pass.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log("Resposta da req: ", response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

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
        <S.Image src={pass.image} />
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
            <S.ImageSecondVerification src={pass.image_verification_software} />
          </S.SecondVerification>
        </S.InfoContainer>
        <S.OtherContainer />
      </S.ContentMaster>
      <S.Excluir onClick={() => deletePassword()}>Excluir</S.Excluir>
    </S.Container>
  );
}

export default PasswordCard;
