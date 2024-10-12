import { useEffect, useRef, useState } from "react";
import styles from "./Noted.module.css";
import clsx from "clsx";
import { useSelection } from "./Noted.hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  notionInputsVariants,
  selectTextVariants,
  textAreaVariants,
} from "./Noted.animations";
import { CreateACard } from "./Noted.services";

export default function Noted({
  apiKey,
  boardId,
}: {
  apiKey: string;
  boardId: string;
}) {
  console.log(apiKey, boardId);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [bugTitle, setBugTitle] = useState("");
  const {
    handleKeyDown,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleResizeMouseDown,
    goToDescriptionStep,
    selectionInfos,
    selecting,
    active,
    visible,
  } = useSelection();

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

          {selectionInfos.hasTitle && (
            <motion.div
              variants={notionInputsVariants}
              initial="initial"
              animate="animate"
              transition={{
                ease: "easeOut",
                delay: 0.7,
              }}
              className={styles.inputsWrapper}
            >
              <div className={styles.assign}></div>
              <div className={styles.type}></div>
            </motion.div>
          )}
          <motion.div
            initial={{ width: "250px" }}
            animate={{
              width: selectionInfos.hasTitle
                ? "450px"
                : selectionInfos.selectionEnded
                  ? "350px"
                  : "250px",
              height: selectionInfos.hasTitle ? "300px" : "48px",
            }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 150,
              delay: selectionInfos.hasTitle ? 0.1 : 0,
            }}
            className={clsx(styles.inputWrapper)}
          >
            <AnimatePresence mode="wait">
              {!selectionInfos.selectionEnded && (
                <motion.span
                  key="select"
                  variants={selectTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.select}
                >
                  {selecting ? "Selecting..." : "Select a zone"}
                </motion.span>
              )}

              {selectionInfos.selectionEnded && !selectionInfos.hasTitle && (
                <motion.input
                  key="title-input"
                  variants={selectTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.titleInput}
                  placeholder="Describe the bug..."
                />
              )}

              {selectionInfos.hasTitle && (
                <motion.textarea
                  variants={textAreaVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="description-input"
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
