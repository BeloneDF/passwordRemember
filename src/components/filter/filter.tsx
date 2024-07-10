import { useCallback, useContext, useEffect, useState } from "react";
import newPassword from "../../function/passwordGenerator";
import { useFilter } from "@hooks/useFilter";
import useOpenModal from "@hooks/useOpenModal";
import { UserContext } from "@hooks/userContext";
import { Passwords } from "@types/passwords";
import FilterList from "../filterList/filterList";
import HeaderList from "../header/headerList";
import { TextInput } from "../input/text-input/input";
import Modal from "../modal/modal";
import * as S from "./filter.styled";
import { LargeButtonComponent } from "../largeButton/largeButton";
import { selectMethod } from "../../api/methods";
import { jwtDecode } from "jwt-decode";

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  const [checked, setChecked] = useState(false);
  const userContext = useContext(UserContext);
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

  interface MyJwtPayload {
    data: Passwords[];
  }

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
      return;
    } catch (error) {
      console.error(error);
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
      const response = await selectMethod(
        "post",
        "password",
        passwordWithUserId
      );
      setPasswords(response.data);
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }
  }, [user, password]);

  useEffect(() => {
    getPasswords();
    return;
  }, [getPasswords]);

  const generetedPassword = newPassword();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const base64 = (await getBase64(file)) as string;
        setPassword({ ...password, image: base64 });
      }
    }
  };

  const handle2FAFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const base64 = (await getBase64(file)) as string;
        setPassword({ ...password, image_verification_software: base64 });
      }
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
