import * as S from "./headerApp.styled";
import { UserContext } from "@hooks/userContext";
import { useContext } from "react";
import Menu from "@components/menu/menu";
import useOpenModal from "@hooks/useOpenModal";
import Image from "react-bootstrap/Image";
import useEdit from "@hooks/useEdit";

function HeaderApp() {
  const userContext = useContext(UserContext);
  const { open, toggleModal } = useOpenModal();
  const { edit, toggleEdit } = useEdit();

  console.log();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { user } = userContext;

  function logout() {
    localStorage.removeItem("acess_token");
    window.location.reload();
  }

  if (!user) {
    return (
      <S.Container>
        <S.TitleContainer>
          <S.SkeletonLoader style={{ width: "200px", height: "1.5em" }} />
        </S.TitleContainer>
        <S.ConfigContainer>
          <S.SkeletonLoader style={{ width: "24px", height: "24px" }} />
        </S.ConfigContainer>
      </S.Container>
    );
  }
  return (
    <S.Container>
      <Menu
        show={open}
        handleClose={toggleModal}
        user={user}
        toggleEdit={toggleEdit}
        edit={edit}
      ></Menu>

      <S.TitleContainer>
        <Image
          onClick={toggleModal}
          src={user?.photo}
          roundedCircle
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        ></Image>
        <S.Title>{user?.username}, Bem Vindo!</S.Title>
      </S.TitleContainer>
      <S.ConfigContainer>
        <S.Button onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </S.Button>
      </S.ConfigContainer>
    </S.Container>
  );
}

export default HeaderApp;
