import { InputContext } from "../context/InputContext";
import { useContext } from "react";

export const useInput = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error("useInput must be used within a InputProvider");
  }

  return context;
};
