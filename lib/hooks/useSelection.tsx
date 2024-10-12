import { SelectionContext } from "../context/SelectionContext";
import { useContext } from "react";

export const useSelection = () => {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }

  return context;
};
