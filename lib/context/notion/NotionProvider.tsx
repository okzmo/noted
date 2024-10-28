import { NotionContext } from "./NotionContext";
import { ReactNode, useState } from "react";

export const NotionProvider = ({
  children,
  apiKey,
  boardId,
}: {
  children: ReactNode;
  apiKey: string;
  boardId: string;
}) => {
  const [config, setConfig] = useState({
    apiKey,
    boardId,
  });
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");

  return (
    <NotionContext.Provider
      value={{
        config,
        setConfig,
        bugTitle,
        setBugTitle,
        bugDescription,
        setBugDescription,
      }}
    >
      {children}
    </NotionContext.Provider>
  );
};
