import { useContext, useCallback, useEffect, useState } from "react";
//import { api } from "../../hooks/api";
import { useFilter } from "../../hooks/useFilter";
import useOpenModal from "../../hooks/useOpenModa";
import { Passwords } from "../../types/passwords";
import FilterList from "../filterList/filterList";
import HeaderList from "../header/headerList";
import { TextInput } from "../input/text-input/input";
import Modal from "../modal/modal";
import * as S from "./filter.styled";
import axios from "axios";
import { UserContext } from "../../hooks/userContext";

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user } = userContext;

  const [password, setPassword] = useState<Passwords>({
    password: "",
    name: "",
    image: "",
    second_verification: false,
    verificarion_software: "",
    image_verification_software: "",
    userId: "",
    login: "",
  });
  const getPasswords = useCallback(async () => {
    const token = localStorage.getItem("acess_token");
    try {
      const response = await axios.get(
        `http://localhost:3001/passwordsByUser/${user?.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setLoading(false);
      setPasswords(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getPasswords();
    return;
  }, [getPasswords]);

  return (
    <S.Container>
      <Modal open={open} toggleModal={toggleModal}>
        <TextInput
          id="teste"
          value={password.password}
          label="Digite a sua senha"
          placeholder="Digite sua senha..."
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          type="password"
        />
      </Modal>
      <HeaderList
        setSearch={setSearch}
        search={search}
        toggleModal={toggleModal}
      ></HeaderList>
      <FilterList
        loading={loading}
        filteredPasswords={filteredPasswords}
        passwords={passwords}
      />
    </S.Container>
  );
}

export default Filter;
