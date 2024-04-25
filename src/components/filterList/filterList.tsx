import * as S from "./filterList.styled";
import { Passwords } from "../../types/passwords";
import Loading from "../loading/loading";
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
          return (
            <h3
              style={{ color: "black", textTransform: "capitalize" }}
              key={pass.id}
            >
              {pass.name}
            </h3>
          );
        })
      ) : (
        passwords.map((pass) => {
          return (
            <h3 style={{ color: "black", textTransform: "capitalize" }} key={pass.id}>
              {pass.name}
            </h3>
          );
        })
      )}
    </S.Container>
  );
}

export default FilterList;
