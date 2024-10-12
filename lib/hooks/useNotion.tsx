import { NotionContext } from "../context/NotionContext";
import { useContext } from "react";

export const useNotion = () => {
  const context = useContext(NotionContext);

  if (!context) {
    throw new Error("useNotion must be used within a NotionProvider");
  }

  return context;
};
