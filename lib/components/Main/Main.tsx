import { KeyboardEventHandler, useEffect } from "react";
import styles from "./Main.module.css";
import { useSelection } from "../../hooks/useSelection";
import { AnimatePresence, motion } from "framer-motion";
import {
  selectTextVariants,
  textAreaVariants,
} from "./Main.animations";
import { SelectionOverlay } from "../SelectionOverlay/SelectionOverlay";
import { useNotion } from "../../hooks/useNotion";
import { InputWrapper } from "../InputWrapper";
import { useCardCreation } from "../../hooks/useCardCreation";

export const Main = () => {
  const {
    setBugTitle,
    setBugDescription,
    name,
    setName,
  } = useNotion();
  const { mutate, isPending } = useCardCreation();
  const {
    handleKeyDown,
    goToDescriptionStep,
    selectionInfos,
    selecting,
    visible,
  } = useSelection();

  const handleGoToSelect: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setName((event.target as HTMLInputElement).value);
      localStorage.setItem("ntd-name", (event.target as HTMLInputElement).value);
    }
  }

  const handleGoToDescription: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToDescriptionStep();
      setBugTitle((event.target as HTMLInputElement).value);
    }
  };

  const handleCreateCard: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setBugDescription((event.target as HTMLTextAreaElement).value);
      mutate();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <div className={styles.mainWrapper}>
          <SelectionOverlay />

          <InputWrapper>
            <AnimatePresence mode="wait">
              {!name && (
                <motion.input
                  key="title-input"
                  variants={selectTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.titleInput}
                  placeholder="Your name..."
                  onKeyDown={handleGoToSelect}
                />
              )}

              {(!selectionInfos.selectionEnded && name) && (
                <motion.span
                  key="select"
                  variants={selectTextVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.select}
                >
                  {isPending
                    ? "Creating the card..."
                    : selecting
                      ? "Selecting..."
                      : "Select a zone"}
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
                  onKeyDown={handleGoToDescription}
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
                  onKeyDown={handleCreateCard}
                />
              )}
            </AnimatePresence>
          </InputWrapper>
        </div>
      )}
    </AnimatePresence>
  );
};

