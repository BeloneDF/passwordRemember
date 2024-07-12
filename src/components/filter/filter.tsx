import { useCallback, useContext, useEffect, useState } from "react";
import newPassword from "../../function/passwordGenerator";
import { useFilter } from "@hooks/useFilter";
import useOpenModal from "@hooks/useOpenModal";
import { UserContext } from "@hooks/userContext";
import { Passwords } from "../../types/passwords";
import FilterList from "../filterList/filterList";
import HeaderList from "../header/headerList";
import { TextInput } from "../input/text-input/input";
import Modal from "../modal/modal";
import * as S from "./filter.styled";
import { LargeButtonComponent } from "../largeButton/largeButton";
import { selectMethod } from "../../api/methods";
import { jwtDecode } from "jwt-decode";
import CustomAlert from "@components/alert/alert";

interface MyJwtPayload {
  data: Passwords[];
}

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  const [checked] = useState(false);
  const userContext = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState<string>("");

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

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { user } = userContext;

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const getPasswords = useCallback(async () => {
    try {
      const response = await selectMethod("get", `passwordsByUser/${user?.id}`);
      setPasswords(jwtDecode<MyJwtPayload>(response.data.token).data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); // Garanta que setLoading seja definido em caso de erro também
    }
  }, [user]);

  const addPassword = useCallback(async () => {
    if (!user?.id) {
      console.error("User não encontrado!");
      return;
    }
    const passwordWithUserId = {
      ...password,
      userId: user.id,
    };
    try {
      await selectMethod("post", "password", passwordWithUserId);
      setLoading(true);
      setPassword({
        password: "",
        name: "",
        image: "",
        second_verification: false,
        verificarion_software: "",
        image_verification_software: "",
        userId: "",
        login: "",
      });
      toggleModal();
      await getPasswords();
      setAlertMessage("correct");
    } catch (error) {
      setAlertMessage("error");
      console.error(error);
      setLoading(false);
    }
  }, [user, password, getPasswords, toggleModal]);

  useEffect(() => {
    getPasswords(); // Chamada inicial ao montar o componente
  }, [getPasswords]); // Certifique-se de usar getPasswords como dependência para reexecutar apenas quando ele mudar

  const generetedPassword = newPassword();

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "image_verification_software"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const base64 = (await getBase64(file)) as string;
        setPassword((prevPassword) => ({
          ...prevPassword,
          [field]: base64,
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <S.Container>
      {alertMessage === "" ? null : alertMessage === "correct" ? (
        <CustomAlert
          message={"Senha Adicionada com sucesso!"}
          variant="success"
        />
      ) : (
        <CustomAlert message={"Erro ao adicionar senha!"} variant="danger" />
      )}
      <Modal open={open} toggleModal={toggleModal}>
        <div>
          <label> Gerar senha</label>
          <input disabled onChange={handleInputChange} type="checkbox" />
          Indisponível no momento
        </div>
        <TextInput
          id="password"
          value={checked ? generetedPassword : password.password}
          label="Digite a sua senha"
          placeholder="Digite sua senha..."
          disabled={checked ? true : false}
          onChange={handleInputChange}
          type="password"
        />
        <TextInput
          id="name"
          value={password.name}
          label="Site da sua senha"
          placeholder="Digite o site da sua senha..."
          onChange={handleInputChange}
          type="text"
        />
        <input
          id="image"
          placeholder=""
          onChange={(e) => handleFileChange(e, "image")}
          type="file"
        />
        <TextInput
          id="login"
          value={password.login}
          label="Login da sua senha"
          placeholder="Digite o Login da sua senha..."
          onChange={handleInputChange}
          type="text"
        />
        <div>
          <label>2FA?</label>
          <input
            name="second_verification"
            id="second_verification"
            onChange={handleInputChange}
            type="checkbox"
          />
        </div>
        {password.second_verification && (
          <>
            <TextInput
              id="verificarion_software"
              value={password.verificarion_software}
              label="Software de 2 fatores"
              placeholder="Digite o software de autenticação..."
              onChange={handleInputChange}
              type="text"
            />
            <input
              id="imagem2fa"
              placeholder=""
              onChange={(e) =>
                handleFileChange(e, "image_verification_software")
              }
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
