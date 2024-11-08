import { createContext } from "react";

export interface PinContextProps {
  handleKeyDown: (event: KeyboardEvent) => void;
  resetPin: () => void;
  goToDescriptionStep: () => void;
  setPinning: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  setPinInfos: (pinInfos: any) => void;
  visible: boolean;
  keys: string[];
  pinning: boolean;
  pinInfos: any;
}

export const PinContext = createContext<PinContextProps>({
  handleKeyDown: () => {},
  resetPin: () => {},
  goToDescriptionStep: () => {},
  setPinning: () => {},
  setVisible: () => {},
  setPinInfos: () => {},
  visible: false,
  keys: [],
  pinning: false,
  pinInfos: {},
});
