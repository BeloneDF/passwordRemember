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
import { Image } from "react-bootstrap";

interface MyJwtPayload {
  data: Passwords[];
}

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  const [checked, setChecked] = useState(false);
  const userContext = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [generatedPassword, setGeneratedPassword] = useState("");

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
      setLoading(false);
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
    getPasswords();
  }, [getPasswords]);

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

  useEffect(() => {
    if (checked) {
      setGeneratedPassword(newPassword());
    }
  }, [checked]);

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
        <TextInput
          id="name"
          value={password.name}
          label="Site da sua senha"
          placeholder="Digite o site da sua senha..."
          onChange={handleInputChange}
          type="text"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingLeft: 10,
          }}
        >
          <label>Imagem do Site/Aplicação</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            {password.image && (
              <Image
                src={password.image}
                roundedCircle
                style={{ width: 50, height: 50 }}
              />
            )}
            <input
              id="image"
              placeholder=""
              onChange={(e) => handleFileChange(e, "image")}
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            paddingLeft: 10,
          }}
        >
          <label> Gerar senha aleatória</label>
          <input
            id="checked"
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
          />
        </div>
        <TextInput
          id="password"
          value={checked ? generatedPassword : password.password}
          label="Digite a sua senha"
          placeholder="Digite sua senha..."
          disabled={checked ? true : false}
          onChange={handleInputChange}
          type="password"
        />
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            paddingLeft: 10,
            bottom: 10,
          }}
        >
          Senha: {checked ? generatedPassword : password.password}
        </span>
        <TextInput
          id="login"
          value={password.login}
          label="Login da sua senha"
          placeholder="Digite o Login da sua senha..."
          onChange={handleInputChange}
          type="text"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            paddingLeft: 10,
          }}
        >
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                paddingLeft: 10,
              }}
            >
              <label>Imagem do Software de 2 fatores</label>
              <div>
                {password.image_verification_software && (
                  <Image
                    src={password.image_verification_software}
                    roundedCircle
                    style={{ width: 50, height: 50 }}
                  />
                )}
                <input
                  id="imagem2fa"
                  placeholder=""
                  onChange={(e) =>
                    handleFileChange(e, "image_verification_software")
                  }
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
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
