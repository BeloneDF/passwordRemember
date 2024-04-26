import { TextInput } from '../input/text-input/input';
import { LargeButtonComponent } from '../largeButton/largeButton';
import * as S from './header.syled';

interface HeaderListProps {
  setSearch: (value: string) => void;
  search: string;
  toggleModal: () => void;
}

function HeaderList({ setSearch, search, toggleModal }: HeaderListProps) {
  return (
    <S.Container>
      <S.SearchDiv>
        <TextInput
          id="filter"
          value={search}
          onChange={e => setSearch(e.target.value)}
          name="filter"
          type="text"
          placeholder="Pesquisar suas senhas"
        />
      </S.SearchDiv>
      <S.ButtonDiv>
        <LargeButtonComponent id="button" onClick={() => toggleModal()}>
          Adicionar senha
        </LargeButtonComponent>
      </S.ButtonDiv>
    </S.Container>
  );
}

export default HeaderList;
