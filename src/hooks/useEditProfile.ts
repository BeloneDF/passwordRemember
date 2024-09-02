import { useState } from "react";

export function useEditProfile() {
  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return { edit, handleEdit };
}
