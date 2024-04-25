import * as S from "./filterList.styled";
import { Passwords } from "../../types/passwords";

interface FilterListRepo {
  loading: boolean;
  filteredPasswords: Passwords[];
  passwords: Passwords[];
}

function FilterList({ loading, filteredPasswords, passwords }: FilterListRepo) {
  return (
    <S.Container>
      {loading ? (
        <h3 style={{ color: "black" }}>Carregando...</h3>
      ) : filteredPasswords.length > 0 ? (
        filteredPasswords.map((pass) => {
          return (
            <h3 style={{ color: "black" }} key={pass.name}>
              {pass.name}
            </h3>
          );
        })
      ) : (
        passwords &&
        passwords.map((pass) => {
          return (
            <h3 style={{ color: "black" }} key={pass.id}>
              {pass.name}
            </h3>
          );
        })
      )}
    </S.Container>
  );
}

export default FilterList;
