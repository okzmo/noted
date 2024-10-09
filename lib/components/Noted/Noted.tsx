import { useEffect, useRef } from "react";
import styles from "./Noted.module.css";
import clsx from "clsx";
import { useSelection } from "./Noted.hooks";
import { AnimatePresence, motion } from "framer-motion";

export default function Noted() {
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    handleKeyDown,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleResizeMouseDown,
    selectionInfos,
    selecting,
    active,
    visible,
  } = useSelection();

  const selectVariants = {
    initial: {
      opacity: 0,
      y: 5,
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        ease: "easeOut",
        duration: 0.1,
      },
    },
  };

  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener("keydown", handleKeyDown, {
      signal: controller.signal,
    });
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
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
  ]);

  return (
    <>
      {visible && (
        <>
          <div
            ref={overlayRef}
            className={clsx(styles.backdrop, active && styles.open)}
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

          <motion.div
            initial={{ width: "250px" }}
            animate={{
              width: selectionInfos.selectionEnded ? "450px" : "250px",
              height: selectionInfos.selectionEnded ? "300px" : "48px",
            }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 150,
              delay: selectionInfos.selectionEnded ? 0.1 : 0,
            }}
            className={clsx(styles.inputWrapper)}
          >
            <AnimatePresence mode="wait">
              {!selectionInfos.selectionEnded && (
                <motion.span
                  key="select"
                  variants={selectVariants}
                  initial="initial"
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      ease: "easeOut",
                      duration: 0.1,
                      delay: 0.3,
                    },
                  }}
                  exit="exit"
                  className={styles.select}
                >
                  {selecting ? "Selecting..." : "Select a zone"}
                </motion.span>
              )}

              {selectionInfos.selectionEnded && (
                <motion.textarea
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      ease: "easeOut",
                      duration: 0.1,
                      delay: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      ease: "easeOut",
                      duration: 0.1,
                      delay: 0,
                    },
                  }}
                  key="input"
                  className={styles.input}
                  placeholder="Send a message..."
                />
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
}
