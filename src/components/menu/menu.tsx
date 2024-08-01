import Offcanvas from "react-bootstrap/Offcanvas";
import { User } from "../../hooks/userContext";
import { Image } from "react-bootstrap";
import * as S from "./menu.styled";
import { TextInput } from "@components/input/text-input/input";
import { useState } from "react";
import { selectMethod } from "../../api/methods";
import CustomAlert from "@components/alert/alert";
import logo from "../../assets/logo.png";

type MenuType = {
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  user?: User;
  toggleEdit: () => void;
  edit: boolean;
};

function Menu({ show, handleClose, user, toggleEdit, edit }: MenuType) {
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [userMenu, setUserMenu] = useState<User>({
    id: user?.id ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: user?.password ?? "",
    photo: user?.photo ?? "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserMenu((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const updateUser = async () => {
    try {
      await selectMethod("put", `users/${user?.id}`, userMenu);
      setAlertMessage("correct");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
      setAlertMessage("error");
    }
  };

  function logout() {
    localStorage.removeItem("acess_token");
    window.location.reload();
  }

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            style={{
              paddingLeft: 10,
              gap: 10,
              display: "flex",
              alignItems: "center",
              color: "gray",
            }}
          >
            <Image
              src={user?.photo}
              roundedCircle
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
            {user?.username}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <TextInput
            id="username"
            name="username"
            label="Username"
            placeholder={user?.username}
            type="text"
            disabled={edit}
            onChange={(e) => handleInputChange(e)}
          />
          <TextInput
            id="email"
            name="email"
            label="Email"
            placeholder={user?.email}
            type="email"
            disabled={edit}
            onChange={(e) => handleInputChange(e)}
          />
          <TextInput
            id="password"
            name="password"
            label="Password"
            placeholder={user?.password}
            type="password"
            disabled={edit}
            onChange={(e) => handleInputChange(e)}
          />
          <S.Content>
            <S.ButtonContainer>
              <S.EditButton onClick={toggleEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                </svg>
              </S.EditButton>
              {!edit ? (
                <S.SaveButton onClick={updateUser}>Salvar</S.SaveButton>
              ) : null}
            </S.ButtonContainer>
          </S.Content>
          <S.Footer>
            <S.ExitButton onClick={logout}>Sair</S.ExitButton>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              @2024 - Todos os direitos reservados | @belone.fraga
              <img
                src={logo}
                alt=""
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </div>
          </S.Footer>
        </Offcanvas.Body>
        {alertMessage === "" ? null : alertMessage === "correct" ? (
          <CustomAlert
            message={"Usuário alterado com sucesso!"}
            variant="success"
          />
        ) : (
          <CustomAlert message={"Erro ao alterar usuário!"} variant="danger" />
        )}
      </Offcanvas>
    </>
  );
}

export default Menu;
