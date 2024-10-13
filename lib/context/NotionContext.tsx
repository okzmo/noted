import { createContext, ReactNode, useState } from "react";

export interface NotionContextProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  setConfig: (config: {
    apiKey: string;
    boardId: string;
    bucketConfig: {
      bucketName: string;
      id: string;
      secret: string;
      url: string;
      region: string;
    };
  }) => void;
  members: string[];
  setMembers: (members: string[]) => void;
  bugTitle: string;
  setBugTitle: (bugTitle: string) => void;
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
  bucketConfig,
}: {
  children: ReactNode;
  apiKey: string;
  boardId: string;
  bucketConfig: {
    bucketName: string;
    id: string;
    secret: string;
    url: string;
    region: string;
  };
}) => {
  const [config, setConfig] = useState({
    apiKey,
    boardId,
    bucketConfig,
  });
  const [members, setMembers] = useState<string[]>([]);
  const [bugTitle, setBugTitle] = useState("");
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
