import { useEffect } from "react";
import styles from "./Main.module.css";
import { useInput } from "../../hooks/useInput";
import { AnimatePresence, motion } from "framer-motion";
import {
  notionInputsVariants,
  selectTextVariants,
  textAreaVariants,
} from "./Main.animations";
import { useNotion } from "../../hooks/useNotion";
import { InputWrapper } from "../InputWrapper";
import { useMembers } from "../../hooks/useMembers";
import { useCardCreation } from "../../hooks/useCardCreation";

export const Main = () => {
  const { bugTitle, setBugTitle, setBugDescription } = useNotion();
  const { isLoading } = useMembers();
  const { mutate, isPending } = useCardCreation();

  const { handleKeyDown, visible } = useInput();

  const handleGoToNextStep = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
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

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <>
          {bugTitle && (
            <motion.div
              key={"title-input"}
              variants={notionInputsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={styles.inputsWrapper}
            >
              <div className={styles.assign}></div>
            </motion.div>
          )}
          <InputWrapper key={"input-wrapper"}>
            <AnimatePresence mode="wait">
              {!bugTitle && (
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

              {bugTitle && !isPending && (
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
      )}
    </AnimatePresence>
  );
};
