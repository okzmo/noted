import { KeyboardEventHandler, useEffect } from "react";
import styles from "./Main.module.css";
import { usePin } from "../../hooks/usePin";
import { AnimatePresence, motion } from "framer-motion";
import {
  selectTextVariants,
  textAreaVariants,
} from "./Main.animations";
import { useNotion } from "../../hooks/useNotion";
import { InputWrapper } from "../InputWrapper";
import { useCardCreation } from "../../hooks/useCardCreation";
import { Inbox } from "../Inbox";
import { useGetCards } from "../../hooks/useGetCards";
import { PinCursor } from "../PinCursor";
import { Pin } from "../Pin";
import clsx from "clsx";

export const Main = () => {
  const {
    setBugTitle,
    setBugDescription,
    name,
    setName,
  } = useNotion();
  const { data: cardsData } = useGetCards();
  const { mutate, isPending } = useCardCreation();
  const {
    handleKeyDown,
    goToDescriptionStep,
    pinInfos,
    visible,
  } = usePin();

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
    <>
      <AnimatePresence mode="wait">
        {visible && (
          <div className={styles.mainWrapper}>
            <Inbox cardsData={cardsData} />
            {pinInfos.pinned && (
              <Pin 
                pathToTarget={pinInfos.pathToTarget} 
                clickX={pinInfos.clickX} 
                clickY={pinInfos.clickY} 
                author={name!} 
                bgColor="red" 
              />
            )}

            {cardsData?.map((card, idx) => 
              <Pin 
                key={idx} 
                pathToTarget={card.pinCoords.pathToTarget} 
                clickX={card.pinCoords.clickX} 
                clickY={card.pinCoords.clickY} 
                author={card.author} 
                bgColor={card.status.color} 
              />
            )}

            <InputWrapper>
              <AnimatePresence mode="wait">
                {!name && (
                  <motion.input
                    key="title-input"
                    variants={selectTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={clsx("ntd-wrapper-content", styles.titleInput)}
                    placeholder="Your name..."
                    onKeyDown={handleGoToSelect}
                  />
                )}

                {(!pinInfos.pinned && name) && (
                  <motion.span
                    key="select"
                    variants={selectTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={clsx("ntd-wrapper-content",styles.select)}
                  >
                    {isPending
                      ? "Creating the card..."
                        : "Pin the issue"}
                  </motion.span>
                )}

                {pinInfos.pinned && !pinInfos.hasTitle && (
                  <motion.input
                    key="title-input"
                    variants={selectTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={clsx("ntd-wrapper-content", styles.titleInput)}
                    placeholder="Describe the bug..."
                    onKeyDown={handleGoToDescription}
                  />
                )}

                {pinInfos.hasTitle && (
                  <motion.textarea
                    variants={textAreaVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key="description-input"
                    className={clsx("ntd-wrapper-content", styles.input)}
                    placeholder="Send a message..."
                    onKeyDown={handleCreateCard}
                  />
                )}
              </AnimatePresence>
            </InputWrapper>
          </div>
        )}
      </AnimatePresence>

      <PinCursor />
    </>
  );
};

