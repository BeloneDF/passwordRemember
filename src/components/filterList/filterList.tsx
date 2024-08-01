import { Passwords } from "../../types/passwords";
import Loading from "../loading/loading";
import { PasswordCard } from "../passwordCard/passwordCard";
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : filteredPasswords.length > 0 ? (
        filteredPasswords.map((pass) => (
          <PasswordCard key={pass.id} pass={pass} />
        ))
      ) : passwords.length > 0 ? (
        passwords.map((pass) => <PasswordCard key={pass.id} pass={pass} />)
      ) : null}
    </S.Container>
  );
}

export default FilterList;
