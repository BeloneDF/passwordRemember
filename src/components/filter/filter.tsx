import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import newPassword from '../../function/passwordGenerator';
import { useFilter } from '../../hooks/useFilter';
import useOpenModal from '../../hooks/useOpenModa';
import { UserContext } from '../../hooks/userContext';
import { Passwords } from '../../types/passwords';
import FilterList from '../filterList/filterList';
import HeaderList from '../header/headerList';
import { TextInput } from '../input/text-input/input';
import Modal from '../modal/modal';
import * as S from './filter.styled';

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSearch, filteredPasswords, search } = useFilter(passwords);
  const { open, toggleModal } = useOpenModal();
  const [checked, setChecked] = useState(false);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = userContext;

  const [password, setPassword] = useState<Passwords>({
    password: '',
    name: '',
    image: '',
    second_verification: false,
    verificarion_software: '',
    image_verification_software: '',
    userId: '',
    login: '',
  });
  const getPasswords = useCallback(async () => {
    const token = localStorage.getItem('acess_token');
    try {
      const response = await axios.get(
        `http://localhost:3001/passwordsByUser/${user?.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      setPasswords(response.data);
      console.log('Responsa da req: ', response.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getPasswords();
    return;
  }, [getPasswords]);

  const generetedPassword = newPassword();

  return (
    <S.Container>
      <Modal open={open} toggleModal={toggleModal}>
        <div>
          <label> Gerar senha</label>
          <input onChange={e => setChecked(e.target.checked)} type="checkbox" />
        </div>
        <TextInput
          id="password"
          value={checked ? generetedPassword : password.password}
          label="Digite a sua senha"
          placeholder="Digite sua senha..."
          disabled={checked ? true : false}
          onChange={e => setPassword({ ...password, password: e.target.value })}
          type="password"
        />
        <TextInput
          id="name"
          value={password.name}
          label="Site da sua senha"
          placeholder="Digite o site da sua senha..."
          onChange={e => setPassword({ ...password, name: e.target.value })}
          type="text"
        />
        <TextInput
          id="name"
          value={password.image}
          label="Imagem do site"
          placeholder="d"
          onChange={e => setPassword({ ...password, image: e.target.value })}
          type="text"
        />
        <TextInput
          id="name"
          value={password.name}
          label="Site da sua senha"
          placeholder="Digite o site da sua senha..."
          onChange={e => setPassword({ ...password, name: e.target.value })}
          type="text"
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
