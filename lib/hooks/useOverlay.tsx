import { useRef } from "react";

export const useOverlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  return {
    overlayRef,
    resizeHandleRef,
  };
};
