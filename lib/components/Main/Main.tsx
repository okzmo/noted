import { useEffect, useState } from "react";
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
  const { members, assignees, setAssignees, setBugTitle, setBugDescription } =
    useNotion();
  const [memberQuery, setMemberQuery] = useState("");
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

  const handleAssignMember = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const member = members.find((member) =>
        member.name.toLowerCase().startsWith(memberQuery.toLowerCase()),
      );
      if (member && !assignees.includes(member)) {
        setAssignees((prevAssignees) => [...prevAssignees, member]);
        setMemberQuery("");
      }
    } else if (event.key === "Backspace" && memberQuery === "") {
      event.preventDefault();
      setAssignees((prevAssignees) => prevAssignees.slice(0, -1));
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
              <div className={styles.assign}>
                {assignees.map((assignee, idx) => (
                  <AssignedMember
                    key={`assignee-${idx}`}
                    name={assignee.name}
                  />
                ))}
                <div className={styles.assignInputWrapper}>
                  <input
                    className={styles.assignInput}
                    type="text"
                    value={memberQuery}
                    placeholder={
                      assignees.length > 0
                        ? "Assign more members..."
                        : "Assign members..."
                    }
                    onChange={(event) => setMemberQuery(event.target.value)}
                    onKeyDown={handleAssignMember}
                  />
                </div>
              </div>
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
      )}
    </AnimatePresence>
  );
};

const AssignedMember = ({ name }: { name: string }) => {
  return <div className={styles.assignedMember}>{name}</div>;
};
