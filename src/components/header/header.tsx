import { useState } from 'react';
import { TextInput } from '../input/text-input/input';
import { LargeButtonComponent } from '../largeButton/largeButton';
import * as S from './header.syled';

function Header() {
  const [filter, setFilter] = useState('');
  return (
    <S.Container>
      <S.SearchDiv>
        <TextInput
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          name="filter"
          type="text"
          placeholder="Pesquisar suas senhas"
        />
      </S.SearchDiv>
      <S.ButtonDiv>
        <LargeButtonComponent id="button" onClick={() => console.log(1)}>
          Adicionar nova senha
        </LargeButtonComponent>
      </S.ButtonDiv>
    </S.Container>
  );
}

export default Header;
