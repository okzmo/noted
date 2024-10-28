import { useNotion } from "../hooks/useNotion";
import { createContext, ReactNode, useCallback, useRef, useState } from "react";

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

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [moving, setMoving] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [moveOffset, setMoveOffset] = useState({
    x: 0,
    y: 0,
  });
  const [selectionInfos, setSelectionInfos] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    xStart: 0,
    yStart: 0,
    selectionEnded: false,
    hasTitle: false,
  });
  const selectedRef = useRef({
    xStart: 0,
    yStart: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    selectionEnded: false,
    hasTitle: false,
  });

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!visible) return;
      if (event.button !== 0) return;

      if (event.target === document.getElementById("ntd-selectionRect")) {
        setMoving(true);
        setMoveOffset({
          x: event.clientX - selectedRef.current.x,
          y: event.clientY - selectedRef.current.y,
        });
      } else {
        setSelecting(true);
        selectedRef.current = {
          xStart: event.clientX,
          yStart: event.clientY,
          x: event.clientX,
          y: event.clientY,
          width: 0,
          height: 0,
          selectionEnded: false,
          hasTitle: false,
        };
      }

      setSelectionInfos(selectedRef.current);
    },
    [visible],
  );

  const handleResizeMouseDown = useCallback((event: MouseEvent) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    setSelecting(true);

    selectedRef.current = {
      ...selectedRef.current,
      xStart: selectedRef.current.x,
      yStart: selectedRef.current.y,
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (moving) {
        selectedRef.current = {
          ...selectedRef.current,
          x: event.clientX - moveOffset.x,
          y: event.clientY - moveOffset.y,
        };
      } else if (selecting) {
        selectedRef.current = {
          ...selectedRef.current,
          x: Math.min(selectedRef.current.xStart, event.clientX),
          y: Math.min(selectedRef.current.yStart, event.clientY),
          width: Math.abs(event.clientX - selectedRef.current.xStart),
          height: Math.abs(event.clientY - selectedRef.current.yStart),
        };
      }

      setSelectionInfos(selectedRef.current);
    },
    [selecting, moving, moveOffset],
  );

  const handleMouseUp = useCallback(() => {
    if (!selecting && !moving) return;
    setMoving(false);
    setSelecting(false);
    selectedRef.current = {
      ...selectedRef.current,
      selectionEnded: true,
    };
    setSelectionInfos(selectedRef.current);
  }, [selecting, moving]);

  const resetSelection = useCallback(() => {
    selectedRef.current = {
      xStart: 0,
      yStart: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      selectionEnded: false,
      hasTitle: false,
    };

    setSelectionInfos(selectedRef.current);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!["Alt", "Escape"].includes(event.key)) return;
      console.log(event.key);

      if (event.key === "Escape") {
        if (selectedRef.current.width > 0 && selectedRef.current.height > 0) {
          resetSelection();
        } else {
          setVisible(false);
          setKeys([]);
        }
        return;
      }

      if (!keys[0] && !visible) setKeys([event.key]);
      if (keys[0] === "Alt" && event.altKey) {
        setVisible(true);
        setKeys([]);
      }
    },
    [keys, visible, resetSelection],
  );

  const goToDescriptionStep = useCallback(() => {
    selectedRef.current = {
      ...selectedRef.current,
      hasTitle: true,
    };
    setSelectionInfos(selectedRef.current);
  }, []);

  return (
    <SelectionContext.Provider
      value={{
        handleKeyDown,
        handleMouseDown,
        handleResizeMouseDown,
        handleMouseMove,
        handleMouseUp,
        resetSelection,
        setSelecting,
        goToDescriptionStep,
        setVisible,
        visible,
        keys,
        moving,
        moveOffset,
        selecting,
        selectionInfos,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
