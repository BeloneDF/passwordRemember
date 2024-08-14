import { useContext } from "react";
import { UserContext } from "@/hooks/userContext";

export default function useCustomContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCustomContext must be used within a UserProvider");
  }
  return context;
}
