import { useEffect } from "react";
import styles from "./Main.module.css";
import { useSelection } from "../../hooks/useSelection";
import { AnimatePresence, motion } from "framer-motion";
import {
  notionInputsVariants,
  selectTextVariants,
  textAreaVariants,
} from "./Main.animations";
import { SelectionOverlay } from "../SelectionOverlay/SelectionOverlay";
import { useNotion } from "../../hooks/useNotion";
import { InputWrapper } from "../InputWrapper";
import { useMembers } from "../../hooks/useMembers";
import { useCardCreation } from "../../hooks/useCardCreation";

export const Main = () => {
  const { setBugTitle, setBugDescription } = useNotion();
  const { isLoading } = useMembers();
  const { mutate, isPending } = useCardCreation();

  const {
    handleKeyDown,
    goToDescriptionStep,
    selectionInfos,
    selecting,
    visible,
  } = useSelection();

  const handleGoToNextStep = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToDescriptionStep();
      setBugTitle((event.target as HTMLInputElement).value);
    }
  };

  const handleCreateCard = (event: KeyboardEvent) => {
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

  if (!visible) return null;

  return (
    <>
      <SelectionOverlay />

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
        </motion.div>
      )}
      <InputWrapper>
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
              onKeyDown={handleGoToNextStep}
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
    </>
  );
};
