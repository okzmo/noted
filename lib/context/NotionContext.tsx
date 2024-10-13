import { createContext, ReactNode, useState } from "react";

export interface NotionContextProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  setConfig: (config: { apiKey: string; boardId: string }) => void;
  members: string[];
  setMembers: (members: string[]) => void;
  bugTitle: string | null;
  setBugTitle: (bugTitle: string | null) => void;
  bugDescription: string;
  setBugDescription: (bugDescription: string) => void;
}

export const NotionContext = createContext<NotionContextProps>({
  config: {
    apiKey: "",
    boardId: "",
  },
  setConfig: () => {},
  members: [],
  setMembers: () => {},
  bugTitle: "",
  setBugTitle: () => {},
  bugDescription: "",
  setBugDescription: () => {},
});

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
  const [members, setMembers] = useState<string[]>([]);
  const [bugTitle, setBugTitle] = useState<string | null>(null);
  const [bugDescription, setBugDescription] = useState("");

  return (
    <NotionContext.Provider
      value={{
        config,
        setConfig,
        members,
        setMembers,
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
