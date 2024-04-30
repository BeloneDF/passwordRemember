import { Passwords } from "../../types/passwords";
import Loading from "../loading/loading";
import PasswordCard from "../passwordCard/passwordCard";
import * as S from "./filterList.styled";

interface FilterListRepo {
  loading: boolean;
  filteredPasswords: Passwords[];
  passwords: Passwords[];
}

function FilterList({ loading, filteredPasswords, passwords }: FilterListRepo) {
  return (
    <S.Container>
      {loading ? (
        <Loading />
      ) : filteredPasswords.length > 0 ? (
        filteredPasswords.map((pass) => {
          return <PasswordCard key={pass.id} pass={pass} />;
        })
      ) : passwords.length > 0 ? (
        passwords.map((pass) => {
          return <PasswordCard key={pass.id} pass={pass} />;
        })
      ) : (
        <p style={{ color: "black" }}>voce nao tem senhas cadastradas</p>
      )}
    </S.Container>
  );
}

export default FilterList;
