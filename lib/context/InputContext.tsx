import { useNotion } from "../hooks/useNotion";
import { createContext, ReactNode, useCallback, useState } from "react";

export interface InputContextProps {
  handleKeyDown: (event: KeyboardEvent) => void;
  setBugTitle: (bugTitle: string | null) => void;
  setBugDescription: (bugDescription: string) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
  keys: string[];
}

export const InputContext = createContext<InputContextProps>({
  handleKeyDown: () => {},
  setBugTitle: () => {},
  setBugDescription: () => {},
  setVisible: () => {},
  visible: false,
  keys: [],
});

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const { setBugTitle, setBugDescription } = useNotion();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!["Alt", "Escape"].includes(event.key)) return;

      if (event.key === "Escape") {
        setVisible(false);
        setTimeout(() => {
          setBugTitle(null);
          setBugDescription("");
        }, 200);
        setKeys([]);
        return;
      }

      if (!keys[0] && !visible) setKeys([event.key]);
      if (keys[0] === "Alt" && event.altKey) {
        setVisible(true);
        setKeys([]);
      }
    },
    [keys, visible, setBugTitle, setBugDescription],
  );

  return (
    <InputContext.Provider
      value={{
        handleKeyDown,
        setBugTitle,
        setBugDescription,
        setVisible,
        visible,
        keys,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
