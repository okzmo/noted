import { createContext, Dispatch, ReactNode, useState } from "react";

export interface Member {
  object: "user";
  id: string;
  name: string;
  type: string;
}

export interface NotionContextProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  setConfig: (config: { apiKey: string; boardId: string }) => void;
  members: Member[];
  setMembers: Dispatch<React.SetStateAction<Member[]>>;
  assignees: Member[];
  setAssignees: Dispatch<React.SetStateAction<Member[]>>;
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
  assignees: [],
  setAssignees: () => {},
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
  const [members, setMembers] = useState<Member[]>([]);
  const [assignees, setAssignees] = useState<Member[]>([]);
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");

  return (
    <NotionContext.Provider
      value={{
        config,
        setConfig,
        members,
        setMembers,
        assignees,
        setAssignees,
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
