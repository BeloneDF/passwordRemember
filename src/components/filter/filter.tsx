import { useEffect, useState } from "react";
import { api } from "../../hooks/api";
import { useFilter } from "../../hooks/useFilter";
import useOpenModal from "../../hooks/useOpenModa";
import { Passwords } from "../../types/passwords";
import FilterList from "../filterList/filterList";
import HeaderList from "../header/headerList";
import { TextInput } from "../input/text-input/input";
import Modal from "../modal/modal";
import * as S from "./filter.styled";

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  
  const [password, setPassword] = useState<Passwords>({
    password: "",
    name: "",
    image: "",
    second_verification: false,
    verificarion_software: "",
    image_verification_software: "",
    userId: "",
  });

  async function getPasswords() {
    try {
      const response = await api.get("passwords");
      setLoading(false);
      setPasswords(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPasswords();
    return;
  }, []);

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
