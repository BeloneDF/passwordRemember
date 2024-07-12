import { useState } from "react";

function useEdit() {
  const [edit, setEdit] = useState(true);

  function toggleEdit() {
    setEdit((prev) => !prev);
  }

  return {
    edit,
    toggleEdit,
  };
}

export default useEdit;
