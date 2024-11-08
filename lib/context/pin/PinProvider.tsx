import { PinContext } from "./PinContext"
import { ReactNode, useCallback, useState } from "react";

export const PinProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [pinInfos, setPinInfos] = useState({
    pathToTarget: '',
    clickX: 0,
    clickY: 0,
    pinned: false,
    hasTitle: false,
  });

  const resetPin = useCallback(() => {
    setPinInfos({
      pathToTarget: '',
      clickX: 0,
      clickY: 0,
      pinned: false,
      hasTitle: false,
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!["Alt", "Escape"].includes(event.key)) return;

      if (event.key === "Escape") {
        setPinning(false);
        setVisible(false);
        setKeys([]);
        return;
      }

      if (!keys[0] && !visible) setKeys([event.key]);
      if (keys[0] === "Alt" && event.altKey) {
        setPinning(true);
        setVisible(true);
        setKeys([]);
      }
    },
    [keys, visible],
  );

  const goToDescriptionStep = useCallback(() => {
    setPinInfos((prev) => ({...prev, hasTitle: true}));
  }, []);

  return (
    <PinContext.Provider
      value={{
        handleKeyDown,
        resetPin,
        setPinning,
        goToDescriptionStep,
        setVisible,
        setPinInfos,
        visible,
        keys,
        pinning,
        pinInfos,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};
