import { useEffect, useRef } from "react";
import { useSelection } from "../../hooks/useSelection";
import styles from "./SelectionOverlay.module.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useNotion } from "../../hooks/useNotion";

export const SelectionOverlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const { name } = useNotion();
  const {
    handleKeyDown,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleResizeMouseDown,
    selectionInfos,
    visible,
  } = useSelection();

  useEffect(() => {
    if (!name) return;
    const controller = new AbortController();

    if (overlayRef.current) {
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
    name,
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
  ]);

  return (
    <motion.div
      ref={overlayRef}
      data-ignore-screenshot
      className={clsx(styles.backdrop, visible && styles.open)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        easing: "easeOut",
        duration: 0.1,
      }}
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
    </motion.div>
  );
};
