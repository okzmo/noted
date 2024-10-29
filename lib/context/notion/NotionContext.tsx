import { createContext } from "react";

export interface NotionContextProps {
  config: {
    apiKey: string;
    boardId: string;
  };
  setConfig: (config: { apiKey: string; boardId: string }) => void;
  bugTitle: string;
  setBugTitle: (bugTitle: string) => void;
  bugDescription: string;
  setBugDescription: (bugDescription: string) => void;
  name: string | null;
  setName: (name: string) => void;
  inboxOpen: boolean;
  setInboxOpen: (inboxOpen: boolean) => void;
}

export const NotionContext = createContext<NotionContextProps>({
  config: {
    apiKey: "",
    boardId: "",
  },
  setConfig: () => {},
  bugTitle: "",
  setBugTitle: () => {},
  bugDescription: "",
  setBugDescription: () => {},
  name: null,
  setName: () => {},
  inboxOpen: false,
  setInboxOpen: () => {},
});
