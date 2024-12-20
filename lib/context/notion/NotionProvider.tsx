import { NotionContext } from "./NotionContext";
import { ReactNode, useEffect, useState } from "react";

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
  const [name, setName] = useState<string | null>(null);
  const [inboxOpen, setInboxOpen] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("ntd-name"));
  }, []);

  return (
    <NotionContext.Provider
      value={{
        config,
        setConfig,
        bugTitle,
        setBugTitle,
        bugDescription,
        setBugDescription,
        name,
        setName,
        inboxOpen,
        setInboxOpen,
      }}
    >
      {children}
    </NotionContext.Provider>
  );
};
