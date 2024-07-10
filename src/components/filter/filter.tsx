import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import newPassword from "../../function/passwordGenerator";
import { useFilter } from "../../hooks/useFilter";
import useOpenModal from "../../hooks/useOpenModa";
import { UserContext } from "../../hooks/userContext";
import { Passwords } from "../../types/passwords";
import FilterList from "../filterList/filterList";
import HeaderList from "../header/headerList";
import { TextInput } from "../input/text-input/input";
import Modal from "../modal/modal";
import * as S from "./filter.styled";
import { LargeButtonComponent } from "../largeButton/largeButton";

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  const [checked, setChecked] = useState(false);
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user } = userContext;

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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
    //const token = localStorage.getItem('acess_token');
    try {
      const response = await selectMethod("get", `passwordsByUser/${user?.id}`);
      // const response = await axios.get(
      //   `http://localhost:3001/passwordsByUser/${user?.id}`,
      //   {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //     },
      //   },
      // );
      setPasswords(response.data);
      console.log("Responsa da req: ", response.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const addPassword = useCallback(async () => {
    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }

    const token = localStorage.getItem("acess_token");
    const passwordWithUserId = {
      ...password,
      userId: user.id,
    };
    console.log(passwordWithUserId);
    try {
      const response = await axios.post(
        `http://localhost:3001/password`,
        passwordWithUserId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setPasswords(response.data);
      console.log("Resposta da req: ", response.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  }, [user, password]);

  useEffect(() => {
    getPasswords();
    return;
  }, [getPasswords]);

  useEffect(() => {
    console.log(password.image);
  }, [password.image]);
  const generetedPassword = newPassword();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setPassword({ ...password, image: base64 });
    }
  };

  const handle2FAFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setPassword({ ...password, image_verification_software: base64 });
    }
  };

  return (
    <S.Container>
      <Modal open={open} toggleModal={toggleModal}>
        <div>
          <label> Gerar senha</label>
          <input
            disabled
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
          />
          Indisponível no momento
        </div>
        <TextInput
          id="password"
          value={checked ? generetedPassword : password.password}
          label="Digite a sua senha"
          placeholder="Digite sua senha..."
          disabled={checked ? true : false}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          type="password"
        />
        <TextInput
          id="name"
          value={password.name}
          label="Site da sua senha"
          placeholder="Digite o site da sua senha..."
          onChange={(e) => setPassword({ ...password, name: e.target.value })}
          type="text"
        />
        <input
          id="image"
          label="Imagem do site"
          placeholder=""
          onChange={handleFileChange}
          type="file"
        />
        <TextInput
          id="login"
          value={password.login}
          label="Login da sua senha"
          placeholder="Digite o Login da sua senha..."
          onChange={(e) => setPassword({ ...password, login: e.target.value })}
          type="text"
        />
        <div>
          <label>2FA?</label>
          <input
            name="2faCheck"
            id="2faCheck"
            onChange={(e) =>
              setPassword({
                ...password,
                second_verification: e.target.checked,
              })
            }
            type="checkbox"
          />
        </div>
        {password.second_verification && (
          <>
            <TextInput
              id="secondVerificationSoftware"
              value={password.verificarion_software}
              label="Software de 2 fatores"
              placeholder="Digite o software de autenticação..."
              onChange={(e) =>
                setPassword({
                  ...password,
                  verificarion_software: e.target.value,
                })
              }
              type="text"
            />
            <input
              id="imagem2fa"
              label="Imagem do software de 2fa"
              placeholder=""
              onChange={handle2FAFileChange}
              type="file"
            />
          </>
        )}
        <LargeButtonComponent onClick={() => addPassword()} id="btnAdd">
          Salvar senha
        </LargeButtonComponent>
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
