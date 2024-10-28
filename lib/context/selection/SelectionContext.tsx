import { createContext } from "react";

export interface SelectionContextProps {
  handleKeyDown: (event: KeyboardEvent) => void;
  handleMouseDown: (event: MouseEvent) => void;
  handleResizeMouseDown: (event: MouseEvent) => void;
  handleMouseMove: (event: MouseEvent) => void;
  handleMouseUp: () => void;
  resetSelection: () => void;
  goToDescriptionStep: () => void;
  setSelecting: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
  keys: string[];
  moving: boolean;
  moveOffset: {
    x: number;
    y: number;
  };
  selecting: boolean;
  selectionInfos: any;
}

export const SelectionContext = createContext<SelectionContextProps>({
  handleKeyDown: () => {},
  handleMouseDown: () => {},
  handleResizeMouseDown: () => {},
  handleMouseMove: () => {},
  handleMouseUp: () => {},
  resetSelection: () => {},
  goToDescriptionStep: () => {},
  setSelecting: () => {},
  setVisible: () => {},
  visible: false,
  keys: [],
  moving: false,
  moveOffset: {
    x: 0,
    y: 0,
  },
  selecting: false,
  selectionInfos: {},
});
