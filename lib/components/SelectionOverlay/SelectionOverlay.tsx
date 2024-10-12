import { useEffect, useRef } from "react";
import { useSelection } from "../../hooks/useSelection";
import styles from "./SelectionOverlay.module.css";
import clsx from "clsx";

export const SelectionOverlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const {
    handleKeyDown,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleResizeMouseDown,
    selectionInfos,
    selecting,
    visible,
  } = useSelection();

  useEffect(() => {
    const controller = new AbortController();

    if (overlayRef.current) {
      console.log("adding listeners");
      overlayRef.current.addEventListener("mousedown", handleMouseDown, {
        signal: controller.signal,
      });
      overlayRef.current.addEventListener("mousemove", handleMouseMove, {
        signal: controller.signal,
      });
      overlayRef.current.addEventListener("mouseup", handleMouseUp, {
        signal: controller.signal,
      });
    }

    if (resizeHandleRef.current) {
      resizeHandleRef.current.addEventListener(
        "mousedown",
        handleResizeMouseDown,
        {
          signal: controller.signal,
        },
      );
    }

    return () => {
      controller.abort();
    };
  }, [
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
  ]);

  return (
    <div
      ref={overlayRef}
      className={clsx(styles.backdrop, visible && styles.open)}
    >
      <div
        className={clsx(
          styles.selectionRect,
          selectionInfos.selectionEnded && styles.selected,
        )}
        id="ntd-selectionRect"
        style={{
          left: `${selectionInfos.x}px`,
          top: `${selectionInfos.y}px`,
          width: `${selectionInfos.width}px`,
          height: `${selectionInfos.height}px`,
        }}
      >
        {selectionInfos.selectionEnded && (
          <span ref={resizeHandleRef} className={styles.resizeHandle} />
        )}
      </div>
      {!selecting &&
        selectionInfos.width === 0 &&
        selectionInfos.height === 0 && (
          <p className={styles.title}>SELECT A ZONE</p>
        )}
    </div>
  );
};
