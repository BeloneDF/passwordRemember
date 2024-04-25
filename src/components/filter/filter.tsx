import HeaderList from "../header/headerList";
import * as S from "./filter.styled";
import { useEffect, useState } from "react";
import { Passwords } from "../../types/passwords";
import { api } from "../../hooks/api";
import FilterList from "../filterList/filterList";
import { useFilter } from "../../hooks/useFilter";

function Filter() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);
  const [loading, setLoading] = useState(true);

  const { setSearch, filteredPasswords, search } = useFilter(passwords);

  async function getPasswords() {
    try {
      const response = await api.get("passwords");
      setLoading(false);
      setPasswords(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPasswords();
    return;
  }, []);

  return (
    <S.Container>
      <HeaderList setSearch={setSearch} search={search}></HeaderList>
      <FilterList
        loading={loading}
        filteredPasswords={filteredPasswords}
        passwords={passwords}
      />
    </S.Container>
  );
}

export default Filter;
